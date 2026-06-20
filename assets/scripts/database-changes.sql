-- --------------bulk assignments - CRM -- 17122025----------------------- 
set global event_scheduler = ON;
set global log_bin_trust_function_creators = ON;
set @@sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
-- ---------------------------------------------------------------------
 LOCK TABLES `screensmaster` WRITE;
/*!40000 ALTER TABLE `screensmaster` DISABLE KEYS */;
INSERT INTO `screensmaster` (`id`,`name`, `routename`, `moduleid`, `parentrole`, `menu_order`, `is_new_screen`) VALUES 
(222,'Client Assignments', '/Crm/Employee/BulkAssignments', 12, 1,4, 1),
(223,'Client Assignments', '/Crm/Manager/BulkAssignments', 12, 2,12, 1);
/*!40000 ALTER TABLE `screensmaster` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `screenfunctionalitiesmaster` WRITE;
/*!40000 ALTER TABLE `screenfunctionalitiesmaster` DISABLE KEYS */;
INSERT INTO `screenfunctionalitiesmaster` (`id`,`screenid`, `functionalityid`) VALUES 
('466','222', '1'),('467','222', '2'),('468','222', '3'),
('469','223', '1'), ('470','223', '2'),('471','223', '3');
/*!40000 ALTER TABLE `screenfunctionalitiesmaster` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `rolescreenaccess_common` WRITE;
/*!40000 ALTER TABLE `rolescreenaccess_common` DISABLE KEYS */;
INSERT INTO `rolescreenaccess_common` (`id`,`screenfunctionalityid`) VALUES ('74','466'), ('75','467'), ('76','468');
/*!40000 ALTER TABLE `rolescreenaccess_common` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `rolescreenaccess` WRITE;
/*!40000 ALTER TABLE `rolescreenaccess` DISABLE KEYS */;
INSERT INTO `rolescreenaccess` (`id`,`roleid`, `screenfunctionalityid`) VALUES 
('549','13', '469'), ('550','13', '470'), ('551','13', '471');
/*!40000 ALTER TABLE `rolescreenaccess` ENABLE KEYS */;
UNLOCK TABLES;
 -- ---------------------------------------------------------------------------
  
DROP PROCEDURE IF EXISTS `set_crm_activity_assignment_reusable`;
DELIMITER $$
CREATE PROCEDURE `set_crm_activity_assignment_reusable`(
  	in activity_id int,
  	in assigned_to int,
  	in assigned_by int,
  	in assigned_on datetime,
  	out successState int,
  	out resultmsg text,
  	out assigned_id int
  )
 begin
  	declare vactivity_id int;
 	declare vassigned_to int;
 	declare vassigned_by int;
  	declare vassigned_on datetime;
 	declare veffective_from_date datetime;
  	declare vset_assignment int;
  	declare v_manager int;
 	declare vclient_id int;
 	declare vlast_assigned_id int;
  	declare vlast_assigned_to int;
      
      set successState = 1;
      set resultmsg = 'assignment not completed';
      set assigned_id = 0;
      
 	set vassigned_to = coalesce(`assigned_to`,0);
 	set vassigned_by = coalesce(`assigned_by`,0);
  	set vactivity_id = coalesce(`activity_id`,0);
  
      set vset_assignment = 1;
      set v_manager = 0;
      set vclient_id = ifnull((select c.client_id from crm_employee_activities c where c.id = vactivity_id limit 1),0);
      
      if(vassigned_to = 0 or vactivity_id = 0 or vassigned_by = 0 or vclient_id = 0)then
  		set vset_assignment = 0;
  		set resultmsg = 'Please provide required information';
      end if; 
      if exists(select *from crm_lead_assignments c where c.activity_id = vactivity_id and c.assigned_to = vassigned_to and c.is_revisable = 1 and c.effective_to_date is null )then
  		set vset_assignment = 0;
  		set resultmsg = 'Already assigned';
      end if;
  	if(vset_assignment = 1)then
  		
 		IF EXISTS (SELECT er.empid FROM employee_reportingmanagers er WHERE er.reportingmanagerid = vassigned_by AND er.empid = vassigned_to AND er.effectiveenddate IS NULL) THEN
 			set v_manager = vassigned_by;
 		end if; 
 		IF EXISTS (SELECT *from employee_roles where employee_id = vassigned_by and role_id in(4) and effective_to_date is null)then -- super admin
 			set v_manager = vassigned_by;
 		end if; 
 		set veffective_from_date = current_timestamp();
 		 
 		set vlast_assigned_id = ifnull((select a.id from crm_lead_assignments a where a.client_id = vclient_id and a.is_revisable = 1 and a.effective_to_date is null order by a.id desc limit 1),0);
 		if(vlast_assigned_id > 0 )then
 			set vlast_assigned_to = ifnull((select c.assigned_to from crm_lead_assignments c where c.id = vlast_assigned_id and  c.is_revisable = 1 ),0);
 			if(vassigned_to = vlast_assigned_to )then
 				set veffective_from_date = ifnull((select c.effective_from_date from crm_lead_assignments c where c.id = vlast_assigned_id and  c.is_revisable = 1 ),0);
 			end if;
 		end if;
  		   
 		INSERT INTO crm_lead_assignments(client_id, lead_id, activity_id, assigned_to, assigned_by, approved_by, approved_on, effective_from_date,effective_to_date, is_revisable,assignment_status,follow_up_activity_id)
 			VALUES(vclient_id, 0, vactivity_id, vassigned_to, vassigned_by, v_manager, if(v_manager>0,current_timestamp(),null), veffective_from_date ,null ,if(v_manager>0,1,0),'Pending',null);
 		 set assigned_id = last_insert_id();
 		 if (assigned_id>0 )then
 			set successState = 0;
 			set resultmsg = 'Assignment completed';
 			update crm_lead_assignments c set c.effective_to_date = current_timestamp(), c.is_revisable = 0,
 				c.assignment_status = if(ifnull(c.assignment_status,'Pending') = 'Pending','Cancelled',c.assignment_status)  
 					where c.id != assigned_id and c.client_id = vclient_id and c.effective_to_date is null;
 			if(vlast_assigned_id > 0 )then    
 				update crm_lead_assignments c set c.effective_to_date = current_timestamp(), c.is_revisable = 0,
 					c.follow_up_activity_id= vactivity_id, c.assignment_status = if(ifnull(c.assignment_status,'') = '','Re-assigned',c.assignment_status) 
 						where c.id = vlast_assigned_id;
 			end if;
 		 end if;
        
  	end if;   
  	 
  end$$
DELIMITER ;   
-- ------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS set_crm_activity_assignment;
DELIMITER $$
CREATE PROCEDURE `set_crm_activity_assignment`(
	in activity_id int,
	in assigned_to int,
	in assigned_by int,
	in assigned_on datetime
)
begin
	DECLARE successState TINYINT DEFAULT 1;
    DECLARE resultmsg TEXT DEFAULT 'assignment not completed';
    DECLARE assigned_id INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		SET successState = 1;
        SET resultmsg = 'assignment not completed';
        SET assigned_id = 0;
        SELECT successState,resultmsg,assigned_id;
    END;
    
    call set_crm_activity_assignment_reusable(activity_id,assigned_to,assigned_by,assigned_on,successState,resultmsg,assigned_id);    
     SELECT successState,resultmsg,assigned_id;    
end$$
DELIMITER ;
-- ------------------------------------------------------------
 
DROP PROCEDURE IF EXISTS `set_crm_activity_tracking_reusable`;
DELIMITER $$
CREATE  PROCEDURE `set_crm_activity_tracking_reusable`(
 	in client_id INT,
 	in product_id INT,
 	in activity_type_id INT,
 	in activity_status_id INT,
 	in activity_notes VARCHAR(750),	
 	in next_follow_up_date DATETIME,
 	in client_status_id INT,
 	in created_by INT,
 	in lat VARCHAR(20),
 	in lng VARCHAR(20),
 	in created_on DATETIME,
 	in device VARCHAR(150),    
 	in device_type TEXT,
 	in final_price DECIMAL(10,2),
 	in assigned_to INT,      
 	out successstate int,
 	out resultmsg text,
 	out activity_id int,
 	out device_not_match int,
 	out trace_status int,
 	out addressNotFound int,
 	out latlngid int,
 	out emp_lastlocation int,
 	out geocodeApiKey text,
 	out assigned_id int
   )
 BEGIN	
 	declare v_latlngid int default 0;
 	declare v_addressNotFound int default 1;
 
 	declare v_client_id int default 0;
 	declare v_activity_type_id int default 0;
 	declare v_activity_status_id int default 0;
 	declare v_client_status_id int default 0;
 	declare v_created_by int default 0;
 
 	declare v_min_distance int default 0;    
 	declare v_assigned_to int default 0;
 	declare v_attendance_id int default 0;
 	declare v_device_id int default 0;
 	declare v_emp_last_device int default 0;
 	declare v_manager int default 0;
 	declare v_created_on datetime default fn_get_country_time(`created_on`);
 	declare v_client_status_code varchar(150) default '';
 	declare v_isMobile varchar(10) default 'false';
 	declare v_address text default '';
 	declare v_last_punch_category text default '';
 	declare v_battery_level text default '';
 	declare v_activity_type text default '';
 	declare v_emp_last_trace_type varchar(10) default '';
 	declare v_punch_location text default '';
 	declare v_setActivity int default 1;
 	declare v_line_distance int default -1;
 	declare v_lat DECIMAL(15,8) default 0;
 	declare v_lng DECIMAL(15,8) default 0;
 
 	declare v_trace_json json default '{}';
 	declare v_effective_from_date datetime default fn_get_country_time(`created_on`);
 	declare v_last_assigned_id int default 0;
 	declare v_last_assigned_to int default 0;
 	 
 	declare v_assigned_activity int default 0; 
 	declare v_activity_status varchar(150) default '';
 	DECLARE v_log_json JSON DEFAULT JSON_ARRAY();
 	declare v_log_id int default 0;
 
 	DECLARE out_assigned_status TINYINT DEFAULT 1;
 	DECLARE out_status_message TEXT DEFAULT 'assignment not completed';
 	DECLARE out_assigned_id INT DEFAULT 0;
 
   	SET successstate = 1;
   	SET resultmsg = 'Need to provide all status values with client and employee details.'; 	
 	set activity_id= 0;  
 	set device_not_match = 0;  
 	set trace_status= 0;  
 	set addressNotFound = 1;
 	set latlngid = 0;   
 	SET emp_lastlocation = 0;
 	set geocodeApiKey = fn_get_crm_configure_value('GEOCODE_API_KEY');
 	set assigned_id = 0;
      
   	SET v_client_id = COALESCE(client_id, 0);  
   	SET v_activity_type_id = COALESCE(activity_type_id, 0);
   	SET v_activity_status_id = COALESCE(activity_status_id, 0);
   	SET v_client_status_id = COALESCE(client_status_id, 0);
   	SET v_created_by = COALESCE(created_by, 0);
   	SET v_created_on = fn_get_country_time(created_on);
   	 
   	SET v_client_status_code = IFNULL((SELECT c.code FROM crm_statusmaster c WHERE c.id = v_client_status_id LIMIT 1), '');
   	SET v_min_distance = IFNULL((SELECT fn_get_crm_configure_value('MINIMUM_HAVERSINE_DISTANCE')), 0) / 2; 	 
   	SET v_assigned_to = COALESCE(assigned_to, 0);
      
   	IF(created_on IS NULL OR LENGTH(created_on) = 0) THEN
   		SET v_setActivity = 0;
   		SET resultmsg = 'Activity date and time required';   
   	END IF;
   
   	SET v_activity_type = IFNULL((SELECT s.code FROM crm_statusmaster s WHERE s.id = v_activity_type_id LIMIT 1), '');
   	SET v_attendance_id = IFNULL((SELECT a.id FROM employee_attendance a WHERE a.empid = v_created_by AND a.attendancedate = DATE(v_created_on) LIMIT 1), 0);
   
   	IF(v_activity_type = 'VISIT') THEN
   		IF(v_attendance_id > 0) THEN
   			SET v_last_punch_category = IFNULL((SELECT ad.category FROM employee_attendance_details ad WHERE ad.attendanceid = v_attendance_id AND ad.attendancesource = 'CRM' ORDER BY ad.punchtime DESC LIMIT 1), '');
   			IF(v_last_punch_category = 'out') THEN
   				SET v_setActivity = 0;
   				SET resultmsg = 'Visits not allowed after punch-out (attendance)'; 
   			END IF;
   		ELSE 
   			SET v_setActivity = 0;
   			SET resultmsg = 'Visits not allowed without attendance'; 
   		END IF;
   	END IF;
   
   	SET v_device_id = (SELECT fn_crm_validate_and_get_deviceid(v_created_by, `device`)); 	 
   
   	IF JSON_VALID(device_type) = 1 THEN 
   		SET v_isMobile = (SELECT JSON_EXTRACT(device_type, '$.isMobile'));
   	END IF;
   
   	IF v_isMobile = 'true' THEN  
   		IF v_device_id = 0 THEN  		  
   			SET device_not_match = 1;         
   			SET v_setActivity = 0;
   			SET resultmsg = 'Device is not registered with the Executive.';         
   		END IF;
   	END IF;
       
   	IF EXISTS (select *from crm_employee_activities c where c.client_id= v_client_id AND c.activity_status= v_activity_status_id AND 
   					c.client_status= v_client_status_id AND c.created_by = v_created_by AND c.`description` = activity_notes AND c.latitude = lat AND c.longitude = lng AND 
   					DATE_FORMAT(c.created_on, '%Y-%m-%d %H:%i') = DATE_FORMAT(v_created_on, '%Y-%m-%d %H:%i') )THEN
   		SET v_setActivity = 0;
   		SET resultmsg = 'A similar activity already exists. It might have been saved successfully';
       END IF;
       
   	IF EXISTS ( SELECT 1 FROM crm_employee_activities act JOIN crm_lead_assignments la ON act.id = la.activity_id WHERE la.assigned_to = v_assigned_to AND act.client_id = v_client_id AND  v_client_id > 0 AND act.next_follow_up_on = next_follow_up_date
   			 AND act.activity_type = v_activity_type_id AND v_activity_type = 'VISIT' ) THEN		 
   		SET v_setActivity = 0;
   		SET resultmsg = 'There is an activity already assigned to this employee at this time.';
   	END IF;      
   	 
   	IF (v_setActivity = 1) THEN		 
      
   			IF (v_lat != 0 AND v_lng != 0 AND v_activity_type = 'VISIT') THEN
  				SET v_lat = (CAST(coalesce(lat,0) AS DECIMAL(15,8)));
  				SET v_lng = (CAST(coalesce(lng,0)  AS DECIMAL(15,8)));
   				CALL set_crm_latlng_id(lat,lng, v_address, 1, v_latlngid, v_addressNotFound);
   				SET latlngid = v_latlngid;
   				SET addressNotFound = v_addressNotFound;
                  
   				IF NOT EXISTS (SELECT * FROM crm_employee_activities act WHERE act.client_id = v_client_id and v_client_id > 0) THEN 
   					IF EXISTS (SELECT * FROM crm_clients_master c WHERE c.id = v_client_id AND IF(c.latitude IS NULL, 0, c.latitude) = 0 AND IF(c.longitude IS NULL, 0, c.longitude) = 0) THEN
   						UPDATE crm_clients_master c SET c.latitude = lat, c.longitude = lng, c.latlngid = v_latlngid WHERE c.id = v_client_id;
   					END IF;
   				END IF;
   			 END IF;
              
   			if(v_activity_type = 'VISIT') then
   				set emp_lastlocation  = (select max(id) from crm_employee_location_traces le where le.empid = v_created_by and DATE(le.created_on) = DATE(v_created_on));
   				set v_emp_last_device  = ifnull((select t.device_id from crm_employee_location_traces t where t.id =emp_lastlocation limit 1),0);
   				set v_emp_last_trace_type  = ifnull((select t.trace_type from crm_employee_location_traces t where t.id =emp_lastlocation limit 1),'');
   				set v_line_distance = ifnull((select fn_get_crm_haverson_distance(emp_lastlocation,`lat`,`lng`)),0);
   
   				set v_battery_level = (select le.battery_level from crm_employee_location_traces le where le.id=emp_lastlocation and le.empid=v_created_by);   
 				set v_punch_location = ifnull((JSON_UNQUOTE(JSON_EXTRACT(device_type, '$.location'))),'');
   				set v_trace_json = JSON_OBJECT('location', v_punch_location, 'emp_lastlocation', emp_lastlocation);   
                  
   				if(v_latlngid > 0)then               
   					if exists(select *from crm_employee_location_traces le where le.latlngid=v_latlngid and le.id = emp_lastlocation and le.device_id = v_device_id ) then
   						UPDATE crm_employee_location_traces t SET t.trace_count= t.trace_count + 1, t.battery_level =   v_battery_level, t.updated_on = v_created_on,
                           t.trace_type = if(t.trace_type = 'out',t.trace_type,v_activity_type) ,t.trace_status = 1,
                           t.trace_json = JSON_set(t.trace_json,CONCAT('$[0].location') ,v_punch_location)
   						WHERE t.id = emp_lastlocation;      
   						 
   					else                    
   						INSERT INTO crm_employee_location_traces(`empid`,`latlngid`,`trace_count`,`trace_date`,`trace_type`,`battery_level`,`created_on`,`updated_on`,`device_id`,`distance`,`trace_status`,`speed_details`,`latitude`,`longitude`,`trace_json`)
   							VALUES(v_created_by,v_latlngid,1,DATE(v_created_on), v_activity_type, v_battery_level ,v_created_on,NULL,v_device_id,null,1,null,lat,lng,v_trace_json);
   							set emp_lastlocation =  last_insert_id();
   					end if;
                      
   				else					
   					if(v_line_distance >=0 and v_line_distance < v_min_distance and v_emp_last_device = v_device_id )then
   						UPDATE crm_employee_location_traces t SET t.trace_count= t.trace_count + 1, t.battery_level = v_battery_level, t.updated_on = v_created_on,
                           t.trace_type = if(t.trace_type = 'out',t.trace_type,v_activity_type),t.trace_status = 1,
                           t.trace_json = JSON_set(t.trace_json,CONCAT('$[0].location') ,v_punch_location)
   						WHERE t.id = emp_lastlocation;    
   						 
   					else 						
   						INSERT INTO crm_employee_location_traces(`empid`,`latlngid`,`trace_count`,`trace_date`,`trace_type`,`battery_level`,`created_on`,`updated_on`,`device_id`,`distance`,`trace_status`,`speed_details`,`latitude`,`longitude`,`trace_json`)
   							VALUES(v_created_by,v_latlngid,1,DATE(v_created_on), v_activity_type, v_battery_level ,v_created_on,NULL,v_device_id,null,1,null,lat,lng,v_trace_json);
   							set emp_lastlocation =  last_insert_id();
   					 end if;   
   				end if;   	
   			end if;
   			IF  v_activity_type_id != 0 AND v_activity_status_id != 0 AND v_client_status_id != 0 AND v_created_by != 0 THEN
   				INSERT INTO crm_employee_activities(productid, client_id, activity_type, activity_status, client_status, next_follow_up_on, `description`, created_on, created_by, latlngid, traceid, latitude, longitude, location )
   					VALUES(0, v_client_id, v_activity_type_id, v_activity_status_id, v_client_status_id, next_follow_up_date, activity_notes, v_created_on, v_created_by, v_latlngid, emp_lastlocation, lat, lng, v_punch_location);
   				SET activity_id = LAST_INSERT_ID();
   				 
   				if(activity_id>0 and v_client_status_code = 'WON' and v_client_id > 0)then
   					if not exists(select *from crm_client_price_details cp where cp.client_id = v_client_id and ifnull(cp.final_price,0)>0 ) then 
   						if exists(select *from crm_client_price_details cp where cp.client_id = v_client_id) then
   							update crm_client_price_details cpd set cpd.final_price = `final_price`,cpd.updated_on =  v_created_on, cpd.deal_created_on = v_created_on, cpd.deal_created_by = v_created_by, cpd.updated_by= v_created_by where cpd.client_id = v_client_id;
   						else
   							INSERT INTO crm_client_price_details(client_id,product_id,target_price,final_price,created_on,created_by,updated_on,updated_by,deal_created_on,deal_created_by)
   								VALUES( v_client_id, null,null, `final_price`,v_created_on,v_created_by,null,null,v_created_on,v_created_by);
   						end if;
   					end if;
   				end if;	  
   				 
   				IF activity_id > 0 THEN
   					SET successstate = 0;
   					SET resultmsg = 'Activity details added successfully';  
   					-- Insert into crm_lead_assignments after activity is added
 					if(v_assigned_to != 0 and v_created_by != v_assigned_to)then
 						set v_manager = 0;
                         call set_crm_activity_assignment_reusable(activity_id,v_assigned_to,v_created_by,v_created_on,out_assigned_status,out_status_message,out_assigned_id);
                         set assigned_id = out_assigned_id; 						
                       end if;
                       
                       set v_assigned_activity = ifnull((select a.activity_id from crm_lead_assignments a where a.client_id = v_client_id and a.assigned_to = v_created_by and a.is_revisable = 1 order by a.id desc limit 1),0);
                       if(v_assigned_activity > 0)then    
 						set v_activity_status = ifnull((select s.display_name from crm_statusmaster s where s.id = v_activity_status_id limit 1),''); 
   						update crm_lead_assignments a set a.follow_up_activity_id = activity_id, a.assignment_status = if(INSTR(v_activity_status, 'completed')>0,'Completed','Pending') where a.activity_id = v_assigned_activity;                       
                       end if;
   				END IF;
   			END IF;
   		END IF;  	 
    
   	SET v_log_json = JSON_OBJECT('line_distance',v_line_distance,'min_distance',v_min_distance,'latlngid',v_latlngid,'resultmsg',resultmsg,'setActivity',v_setActivity,'activity_id',activity_id,'device_not_match',device_not_match,'traceid',emp_lastlocation,'employee', get_employee_name(v_created_by));
     
   	INSERT INTO crm_emp_trace_logs(empid,latitude,longitude,log_type,battery_level,created_on,device_json,log_json,traceid,log_code)
   		VALUES(v_created_by,lat,lng,v_activity_type,NULL,v_created_on,device_type,v_log_json, emp_lastlocation, CONCAT(DATE(v_created_on), '-',v_created_by));
   
   	SET v_log_id = LAST_INSERT_ID();
   	IF v_log_id > 0 THEN
   		UPDATE crm_emp_trace_logs e SET e.log_code = CONCAT(e.log_code, '-', e.id) WHERE e.id = v_log_id;
   	END IF; 
            
   	-- SELECT successstate, resultmsg,activity_id,device_not_match,trace_status,addressNotFound,latlngid, emp_lastlocation,geocodeApiKey,assigned_id;
             
END$$
DELIMITER ;   
-- -------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `set_crm_activity_tracking`;
DELIMITER $$
 CREATE PROCEDURE `set_crm_activity_tracking`(
  	 in client_id INT,
      in product_id INT,
      in activity_type_id INT,
      in activity_status_id INT,
      in activity_notes VARCHAR(750),	
      in next_follow_up_date DATETIME,
      in client_status_id INT,
      in created_by INT,
      in lat VARCHAR(20),
      in lng VARCHAR(20),
      in created_on DATETIME,
      in device VARCHAR(150),    
      in device_type TEXT,
      in final_price DECIMAL(10,2),
      in assigned_to INT   
  )
 BEGIN	
 	 declare successstate int default 1;
      declare resultmsg text default 'Need to provide all status values with client and employee details.';
      declare activity_id int default 0;
      declare device_not_match int default 0;
      declare trace_status int default 0;
      declare addressNotFound int default 1;
      declare latlngid int default 0;
      declare emp_lastlocation int default 0;
      declare geocodeApiKey text default '';
      declare assigned_id int default 0;
     
     DECLARE EXIT HANDLER FOR SQLEXCEPTION
 		BEGIN
 			SET successstate = 1;
 			SET resultmsg = 'Need to provide all status values with client and employee details.';
 			SET activity_id = 0;
 			SET device_not_match = 0;
 			SET trace_status = 0;
 			SET addressNotFound = 1;
 			SET latlngid = 0;
 			SET emp_lastlocation = 0;
 			set geocodeApiKey = fn_get_crm_configure_value('GEOCODE_API_KEY');
 			set assigned_id = 0;
 			SELECT successstate, resultmsg,activity_id,device_not_match,trace_status,addressNotFound,latlngid, emp_lastlocation,geocodeApiKey,assigned_id;
 		END;
      
      call set_crm_activity_tracking_reusable(client_id,product_id,activity_type_id,activity_status_id,activity_notes,next_follow_up_date,client_status_id,created_by,lat,lng,created_on,device,device_type,final_price,assigned_to,
      successstate, resultmsg,activity_id,device_not_match,trace_status,addressNotFound,latlngid, emp_lastlocation,geocodeApiKey,assigned_id);
  
 	 SELECT successstate, resultmsg,activity_id,device_not_match,trace_status,addressNotFound,latlngid, emp_lastlocation,geocodeApiKey,assigned_id;
            
  END$$
  DELIMITER ;
  
-- ----------------------------------------------------------------------------------

 
DROP PROCEDURE  IF EXISTS `get_crm_clients_with_emp_status_as_on_date`;
DELIMITER $$
CREATE PROCEDURE `get_crm_clients_with_emp_status_as_on_date`(
    locations mediumtext,
    managers mediumtext,
    employees mediumtext,
    is_summary int, -- if 1 - summary report 0 - detailed report
    user_role varchar(20)  -- Employee,Manager, SA
   )
 begin
   	declare vlocations_count int default 0;
   	declare vmanagers_count int default 0;
   	declare v_is_summary int default 0;	
   declare vemployees_count int default 0;
   	declare vselecteddate datetime default date(fn_get_country_time(''));
     declare vtoday datetime default date(fn_get_country_time(''));
		set v_is_summary = coalesce(is_summary,0);    
          
       -- locations list   
       DROP TEMPORARY TABLE IF EXISTS tmpLocations;
       CREATE TEMPORARY TABLE tmpLocations (id INT PRIMARY KEY);
   	IF locations IS NOT NULL AND JSON_LENGTH(locations) > 0 THEN
           INSERT INTO tmpLocations(id) SELECT jt.value FROM JSON_TABLE(locations, '$[*]' COLUMNS(value INT PATH '$')) jt;
       END IF;
   	set vlocations_count =  (select count(*) from tmpLocations);   
       
       -- managers list	
       DROP TEMPORARY TABLE IF EXISTS tmpManagers;
       CREATE TEMPORARY TABLE tmpManagers (id INT PRIMARY KEY);
       IF managers IS NOT NULL AND JSON_LENGTH(managers) > 0 THEN
           INSERT INTO tmpManagers(id) SELECT jt.value FROM JSON_TABLE(managers, '$[*]' COLUMNS(value INT PATH '$')) jt;
       END IF;
      	set vmanagers_count =  (select count(*) from tmpManagers);
      --  select *from tmpManagers;
       DROP TEMPORARY TABLE IF EXISTS tmpEmployees;
       CREATE TEMPORARY TABLE tmpEmployees (id INT PRIMARY KEY);
       IF employees IS NOT NULL AND JSON_LENGTH(employees) > 0 THEN
           INSERT INTO tmpEmployees(id) SELECT jt.value FROM JSON_TABLE(employees, '$[*]' COLUMNS(value INT PATH '$')) jt;
       END IF;
      	set vemployees_count =  (select count(*) from tmpEmployees);
       
       drop temporary table if exists tbl_employees;
          create temporary table tbl_employees (empid int);  
          
       drop temporary table if exists tbl_employees2;
          create temporary table tbl_employees2 (empid int);  	 
         
       if(vemployees_count > 0)then 		      
   		insert into tbl_employees(empid) SELECT id FROM tmpEmployees;
   	else 		
		INSERT INTO tbl_employees(empid)              
				(select distinct er.empid
   				from employee_reportingmanagers er inner join employee e on e.id = er.empid left join employee_worklocations w on e.id = w.empid 
   					where er.reportingmanagerid in (select id from tmpManagers) and vselecteddate between er.effectivestartdate and ifnull(er.effectiveenddate,vtoday) 
  						--  and w.locationid in (select if(val=0,w.locationid,val) from templocations) and vselecteddate between w.effectivefromdate and ifnull(w.effectivetodate,vtoday)                         
   						and er.empid in (select distinct erl.employee_id from employee_roles erl where erl.role_id in (12,13,14) and vselecteddate between erl.effective_from_date and ifnull(effective_to_date,vtoday) )
                          AND DATE(e.dateofjoin) <= vselecteddate );					
   						
                           
   		if not exists(select *from tbl_employees where empid in(select id from tmpManagers where id in(select er.employee_id from employee_roles er where er.role_id=4 and vselecteddate between er.effective_from_date and ifnull(er.effective_to_date,vtoday))))then
			insert into tbl_employees(empid) 
			(select distinct t.id from tmpManagers t where t.id in(select er.employee_id from employee_roles er where er.role_id=4 and vselecteddate between er.effective_from_date and ifnull(er.effective_to_date,vtoday) ));
		end if;  
          
   	end if;     
        
     	drop temporary table if exists selectedClientList;
   		 create temporary table selectedClientList ( sid int auto_increment not null, client_id int, client_name varchar(150),city varchar(50),state varchar(50),country varchar(50), 
                   client_status varchar(300),activity_status varchar(300), last_activity_id int,next_follow_up_on datetime, final_price decimal(15,2), amount_collected decimal(15,2), 
   				responsible_empid int, responsible_emp_name varchar(300),responsible_emp_code  varchar(150), responsible_emp_status varchar(30), assigned_to_empid int, assigned_by_empid int,assigned_by varchar(150),assigned_on datetime,   client_created_by int,assigned_status varchar(30),
   				primary key (sid));
                   
   	insert into selectedClientList(client_id, client_name,city,state,country,client_status,activity_status,last_activity_id,next_follow_up_on,final_price, amount_collected, 
   				responsible_empid, responsible_emp_name,responsible_emp_code, responsible_emp_status, assigned_to_empid, assigned_by_empid,assigned_by,assigned_on, client_created_by, assigned_status)
   	   select clm.id, clm.organization_name, lm.location ,sm.state,cm.country, 	'','',
           (select et.id from crm_employee_activities et WHERE et.client_id = clm.id order by et.created_on desc limit 1),null, ifnull(cp.final_price,0),
           ifnull((select sum(ifnull(ct.amount,0))  from crm_client_transactions ct where ct.client_id = clm.id ),0),  null,'','',0,
           (select a.assigned_to from crm_lead_assignments a where a.client_id = clm.id and a.is_revisable = 1 and a.effective_to_date is null  order by a.id desc limit 1),  
           (select a.assigned_by from crm_lead_assignments a where a.client_id = clm.id and a.is_revisable = 1 and a.effective_to_date is null  order by a.id desc limit 1),   
           (select get_employee_name(a.assigned_by) from crm_lead_assignments a where a.client_id = clm.id and a.is_revisable = 1 and a.effective_to_date is null  order by a.id desc limit 1),
           (select a.effective_from_date from crm_lead_assignments a where a.client_id = clm.id and a.is_revisable = 1 and a.effective_to_date is null  order by a.id desc limit 1),   
           clm.created_by,'' from  crm_clients_master clm 
           left join crm_lead_assignments asg on asg.client_id = clm.id and asg.is_revisable = 1 and asg.effective_to_date is null 
           left join crm_client_price_details cp on cp.client_id = clm.id
           left join locationsmaster lm on lm.id = clm.city
           left join statesmaster sm on sm.id = clm.state
           left join countrymaster cm on cm.id = clm.country
           where ( ifnull(asg.assigned_to,clm.created_by) in (select empid from tbl_employees)); -- or ifnull(asg.assigned_to,clm.created_by) in (select id from tmpManagers));
              
            update selectedClientList s inner join crm_employee_activities et on et.id = s.last_activity_id set 
   				s.activity_status = ifnull((select s.display_name from crm_statusmaster s where id = et.activity_status),''),
                   s.client_status = ifnull((select s.display_name from crm_statusmaster s where id = et.client_status),''),
                   s.next_follow_up_on =  ifnull(et.next_follow_up_on,null);
             
           update selectedClientList s set s.responsible_empid = ifnull(s.assigned_to_empid,client_created_by); 
           update selectedClientList s set s.responsible_emp_name = get_employee_name(s.responsible_empid);
           update selectedClientList s inner join employee e on e.id = s.responsible_empid set s.responsible_emp_status = if(e.status = 1,'Active','In-Active'),s.responsible_emp_code = e.empid;
           update selectedClientList s set s.assigned_status = (case when ifnull(s.assigned_to_empid,0) > 0  and s.assigned_to_empid != s.client_created_by then 'Assigned' else 'Self' end);
   		 
           if(v_is_summary = 1)then
                   select   responsible_empid, responsible_emp_name,responsible_emp_code, responsible_emp_status,  
                   count(client_id) total_clients,
                    sum(case when assigned_status = 'Self' then 1 else 0 end) self_added_clients,
                    sum(case when assigned_status = 'Assigned' then 1 else 0 end) assigned_clients,
   				   sum(final_price) final_price, sum(amount_collected) amount_collected, 
   				  (case when responsible_emp_status != 'Active' then 1 else 0 end) change_assignment              
                    from  selectedClientList group by responsible_empid, responsible_emp_name,responsible_emp_code, responsible_emp_status order by responsible_emp_name asc;
           else 
   			select client_id, client_name,city,state,country,client_status,activity_status,final_price, amount_collected, last_activity_id,next_follow_up_on,
   				responsible_empid, responsible_emp_name,responsible_emp_code, responsible_emp_status,assigned_by_empid,assigned_by,assigned_on,assigned_status from  selectedClientList;
                    
           end if;
         
   END$$
   DELIMITER ;
    
   

-- ---------------------------------------------------------------- 

DROP PROCEDURE IF EXISTS `set_crm_bulk_assignment_as_on_date`;
DELIMITER $$
 CREATE PROCEDURE `set_crm_bulk_assignment_as_on_date`(
  empid int,
  assigned_to int,
  assigned_by int,
  assigned_on datetime,
  clients_json json
  )
 begin
  	declare vempid int DEFAULT 0;
  	declare vassigned_by int DEFAULT 0;
  	declare vassigned_to int DEFAULT 0;
      declare vassigned_on datetime default current_timestamp();
      declare vassigned_by_name varchar(150) DEFAULT '';
      declare vassigned_to_name varchar(150) DEFAULT '';
      
      declare vClientCount int DEFAULT 0;
      declare vCount int DEFAULT 1;
      declare vClient_id int DEFAULT 0;
      declare vlast_activity_id int DEFAULT 0;
      
      DECLARE out_assigned_status TINYINT DEFAULT 1;
      DECLARE out_status_message TEXT DEFAULT 'assignment not completed';
      DECLARE out_assigned_id INT DEFAULT 0;
      
      DECLARE out_activity_status TINYINT default 1;
      DECLARE out_activity_status_message TEXT DEFAULT 'Acitivity not completed';
      DECLARE out_activity_id int default 0;
      DECLARE out_device_not_match int default 0;
      DECLARE out_trace_status int default 0;
  	DECLARE out_addressNotFound int default 0;
      DECLARE out_latlngid int default 0;
      DECLARE out_emp_lastlocation int default 0;
      DECLARE out_geocodeApiKey text default '';
      DECLARE v_device_type text default '';
      DECLARE resultmsg text default '';
      DECLARE v_next_follow_up datetime ;
      
      DECLARE vcs_id_static int default 0;
      DECLARE vcs_static varchar(20) default '';
      DECLARE vcs_id int default 0;
      DECLARE vcs varchar(20) default '';
      
      IF JSON_VALID(clients_json) = 0 THEN
  		SIGNAL SQLSTATE '45000';         
  		SET resultmsg = 'Invalid JSON input';        
  	END IF;
      
  	set vempid = coalesce(`empid`,0);
  	set vassigned_by = coalesce(`assigned_by`,0);
      set vassigned_to = coalesce(`assigned_to`,0);
      set vassigned_on = coalesce(`assigned_on`,fn_get_country_time(''));       
      
      set v_device_type = '{ "Type": "", "Name": "", "isMobile": "false" }';
      set v_next_follow_up = TIMESTAMP(fn_get_country_time('') + INTERVAL 1 DAY, '10:00:00');
      set vassigned_to_name = get_employee_name(vassigned_to);     
      set vassigned_by_name = get_employee_name(vassigned_by);  
      set vcs_id_static = ifnull((select s.id from crm_statusmaster s where s.`code` = 'FOLLOW-UP' and s.category_id = 1 limit 1),2);
  	set vcs_static = ifnull((select s.display_name from crm_statusmaster s where s.category_id = 1 and s.id = vcs_id_static limit 1),'');
                  
      if(vempid > 0 and vassigned_by > 0 and vassigned_to > 0)then 	   
  	   drop temporary table if exists selectedClientList;
  		  create temporary table selectedClientList ( sid int auto_increment not null, client_id int, client_name varchar(150),city varchar(50),state varchar(50),client_status varchar(300), 
  				last_activity_id int, responsible_empid int, assigned_status varchar(20),assigned_by varchar(150),assigned_on datetime,is_assigned int,status_message text,assigned_id int, primary key (sid));
           
  	  INSERT INTO selectedClientList(client_id, client_name,city,state,client_status, last_activity_id, responsible_empid, assigned_status,assigned_by,assigned_on,is_assigned,status_message,assigned_id)
  		SELECT jt.client_id, jt.client_name,jt.city,jt.state,jt.client_status, jt.last_activity_id, jt.responsible_empid,jt.assigned_status,jt.assigned_by ,jt.assigned_on ,0,'',0 FROM JSON_TABLE( clients_json,'$[*]' COLUMNS (
  		client_id INT PATH '$.client_id', client_name VARCHAR(150) PATH '$.client_name', city VARCHAR(50) PATH '$.city', state VARCHAR(50) PATH '$.state', client_status VARCHAR(300) PATH '$.client_status', 
  		last_activity_id INT PATH '$.last_activity_id', responsible_empid INT PATH '$.responsible_empid', assigned_status varchar(20) PATH '$.assigned_status',
          assigned_by varchar(150) PATH '$.assigned_by',assigned_on datetime PATH '$.assigned_on'  )) AS jt;                   
  	 
  	  set vClientCount = ifnull((select count(*) from selectedClientList),0);           
  	  if (vClientCount > 0 )then 				
  			while (vcount <= vClientCount ) do
  				set vClient_id  = ifnull((select c.client_id from selectedClientList c where c.sid = vcount),0);
  				set vlast_activity_id = ifnull((select c.last_activity_id from selectedClientList c where c.sid = vcount),0);
                  set out_assigned_id = 0;
                  set out_assigned_status = 0;
                  set out_status_message = 'assignment not completed';
                  set vcs_id = 0;
                  set vcs = '';
                  
  				if(vClient_id > 0)then
  					if(vlast_activity_id > 0)then	                    
  						set vcs_id = ifnull((select e.client_status from crm_employee_activities e where e.id = vlast_activity_id limit 1),2);
  						set vcs = ifnull((select s.display_name from crm_statusmaster s where s.category_id = 1 and s.id = vcs_id limit 1),'');						
  						call set_crm_activity_assignment_reusable(vlast_activity_id,vassigned_to,vassigned_by,vassigned_on,out_assigned_status,out_status_message,out_assigned_id);
  						update selectedClientList s set s.is_assigned = if(out_assigned_id > 0,1,0), s.status_message = if(out_assigned_id>0,concat('Assigned to ',vassigned_to_name),'Not assigned'),	s.assigned_id = out_assigned_id ,
  													 s.assigned_by = if(out_assigned_id>0, vassigned_by_name,s.assigned_by), s.assigned_on = if(out_assigned_id>0,vassigned_on,s.assigned_on),
                                                       s.client_status = if(out_assigned_id>0, vcs ,s.client_status)
                                                      where s.sid = vcount and s.client_id = vClient_id;                         
  					end if;
  					if(vlast_activity_id = 0)then    -- call set employee activity								
  						call set_crm_activity_tracking_reusable(vClient_id,0,9,3,'assignment changed for client',v_next_follow_up,vcs_id_static,vassigned_by,'','',vassigned_on,'',v_device_type,0,vassigned_to,
  								out_activity_status, out_activity_status_message,vlast_activity_id,out_device_not_match,out_trace_status,out_addressNotFound,out_latlngid, out_emp_lastlocation,out_geocodeApiKey,out_assigned_id);
  						 
  						update selectedClientList s set s.is_assigned = if(out_assigned_id>0,1,0),s.assigned_status = if(out_assigned_id > 0,'Assigned',s.assigned_status) , 
  														s.status_message = if(out_assigned_id>0,concat('Assigned to ',vassigned_to_name),'Not assigned'),s.assigned_id = out_assigned_id ,
                                                          s.assigned_by = if(out_assigned_id>0,vassigned_by_name,s.assigned_by), s.assigned_on = if(out_assigned_id>0,vassigned_on,s.assigned_on),
                                                          s.client_status = if(out_assigned_id>0, vcs_static ,s.client_status)
  													where s.sid = vcount and s.client_id = vClient_id;       
  					end if;					
  				end if;				
  				set vcount = vcount + 1;
  			end while; 
  	  end if;
    end if;
  	select *from selectedClientList;
  end$$
  DELIMITER ;
  
-- --------------------------------------------------------------------------------
   
-- ======================================================================================================================


DROP PROCEDURE IF EXISTS `get_locations_for_reports_user`;
DELIMITER $$
CREATE PROCEDURE `get_locations_for_reports_user`(
 	in `reports_user_empid` int
 )
 begin
     set @locations = (select s.locations from reports_user_location_mapping s where s.empid = `reports_user_empid` and current_timestamp() 
                       between s.effectivestartdate and ifnull(s.effectiveenddate,current_timestamp()) order by s.id desc limit 1);
     
     set @location_id = replace(replace(@locations,'[',''),']','');
 	if not exists(select * from employee_roles s where s.employee_id = reports_user_empid and s.role_id in (3,4,6) and s.effective_to_date is null) then	
		drop temporary table if exists templocations;
		create temporary table templocations( sid int auto_increment not null, val varchar(255), key (sid) );
 	
		set @sql2 = concat("insert into templocations (val) values ('", replace(( select @location_id as data), ",", "'),('"),"');");
		prepare stmt2 from @sql2;
		execute stmt2;
		deallocate prepare stmt2;
 				 
		select json_arrayagg(json_object(
		'id',           m.`id`,             
		'branchcode',   m.`branchcode`,
		'address1',     m.`address1`, 
		'address2',     m.`address2`, 
		'location',     m.`location`, 
		'city',         m.`city`,
		'cityname',		l.`location`,
		'state',        m.`state`, 
		'pincode',      m.`pincode`,
		'country',      m.`country`,
		'status',		m.`status`,
		'prefix',		e.`prefix`,
		'seed',			e.`seed`,
		'currentvalue',	e.`currentvalue`
		)) as json
		from companyworklocationsmaster m
		inner join employee_idgenerator e on m.id = e.companylocation
		inner join locationsmaster l on m.city = l.id
		where m.id in (select val from templocations);
     elseif exists(select * from employee_roles s where s.employee_id = reports_user_empid and s.role_id in (3,4,6) and s.effective_to_date is null) then	
			select json_arrayagg(json_object(
			'id',           m.`id`,             
			'branchcode',   m.`branchcode`,
			'address1',     m.`address1`, 
			'address2',     m.`address2`, 
			'location',     m.`location`, 
			'city',         m.`city`,
			'cityname',		l.`location`,
			'state',        m.`state`, 
			'pincode',      m.`pincode`,
			'country',      m.`country`,
			'status',		m.`status`,
			'prefix',		e.`prefix`,
			'seed',			e.`seed`,
			'currentvalue',	e.`currentvalue`
			)) as json
			from companyworklocationsmaster m
			inner join employee_idgenerator e on m.id = e.companylocation
			inner join locationsmaster l on m.city = l.id;
     end if;
     drop temporary table if exists templocations;
 end$$
 DELIMITER ;
  
-- ---------------------------------------------------------------------------------------------------------

 
DROP  PROCEDURE IF EXISTS `get_attendance_monthly_report`;
DELIMITER $$
CREATE PROCEDURE `get_attendance_monthly_report`(
       IN `manager_employee_id` LONGTEXT, 
       IN `location_id` LONGTEXT,
       IN `employee_id` INT,
       IN `calendar_date` DATE,
  	 IN `date_filter_type` int,
       IN `start_date` DATE,
       IN `end_date` DATE  
   )
 BEGIN
        DECLARE vmonthstartdate DATE;
        DECLARE vmonthenddate DATE;
        DECLARE vtotalmonthdays INT;
        DECLARE v_monthend_current_flag BOOLEAN DEFAULT FALSE;
        DECLARE vdate_filter_type int default 0;
        
        DECLARE vTmpDate date;
        DECLARE vtbl_count int default 0;
        DECLARE vemp_count int default 0;
        DECLARE vtbl_start INT DEFAULT 1;		
        DECLARE vsql_dates text default '';
         
        DECLARE vcol_dates text default '';
 	   DECLARE vcol_list text default '';
        DECLARE vcol_empty text default '';         
        DECLARE vcol_total text default '';       
        DECLARE vcol_format text default '';     
        DECLARE vsquery text default '';     
        DECLARE vrname text default '';   
      
 	   
         -- --------------------------------------------
  		set vmonthstartdate = start_date;  -- date_filter_type = 2 -- CUSTOM
  		set vmonthenddate = end_date;      -- date_filter_type = 2 -- CUSTOM
          set vdate_filter_type = coalesce(date_filter_type,0);
         
  		IF(date_filter_type  = 0) THEN 			-- CALENDAR BASED			
  			set vmonthstartdate = last_day(calendar_date) + interval 1 day - interval 1 month;		 
  		END IF;  
          
          set vmonthenddate = (case when vmonthenddate>=current_date()  then current_date() else vmonthenddate end);		
          
  		SET vtotalmonthdays = DATEDIFF(vmonthenddate, vmonthstartdate) + 1;
        -- Temporary tables for fast processing
        DROP TEMPORARY TABLE IF EXISTS tmp_dates;
        CREATE TEMPORARY TABLE tmp_dates (attdate DATE PRIMARY KEY) ENGINE=InnoDB;
      
        INSERT IGNORE INTO tmp_dates(attdate)
        SELECT vmonthstartdate + INTERVAL n DAY
        FROM (
          SELECT a.n + b.n*10 AS n
          FROM (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
                UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a,
               (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
                UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
        ) numbers
        WHERE vmonthstartdate + INTERVAL n DAY <= vmonthenddate;
      
        -- Parse JSON once for managers and locations
        DROP TEMPORARY TABLE IF EXISTS tmp_managers;
        DROP TEMPORARY TABLE IF EXISTS tmp_managers2;
        CREATE TEMPORARY TABLE tmp_managers(mid INT PRIMARY KEY) ENGINE=MEMORY;
      
        INSERT IGNORE INTO tmp_managers(mid)
        SELECT CAST(j.val AS SIGNED)
        FROM JSON_TABLE(
              CASE 
                WHEN manager_employee_id IS NULL OR TRIM(manager_employee_id) = '' THEN '[]'
                WHEN JSON_VALID(manager_employee_id) = 1 THEN manager_employee_id
                ELSE CONCAT('[', manager_employee_id, ']')
              END,
              '$[*]' COLUMNS(val VARCHAR(200) PATH '$')
             ) AS j;
        CREATE temporary table tmp_managers2(mid int primary key) engine = memory;
        INSERT INTO tmp_managers2(mid) select mid from tmp_managers;
      
        DROP TEMPORARY TABLE IF EXISTS tmp_locations;
        DROP TEMPORARY TABLE IF EXISTS tmp_locations2;
        CREATE TEMPORARY TABLE tmp_locations(lid INT PRIMARY KEY) ENGINE=MEMORY;
      
        INSERT IGNORE INTO tmp_locations(lid)
        SELECT CAST(j.val AS SIGNED)
        FROM JSON_TABLE(
              CASE 
                WHEN location_id IS NULL OR TRIM(location_id) = '' THEN '[]'
                WHEN JSON_VALID(location_id) = 1 THEN location_id
                ELSE CONCAT('[', location_id, ']')
              END,
              '$[*]' COLUMNS(val VARCHAR(200) PATH '$')
             ) AS j;
        CREATE TEMPORARY TABLE tmp_locations2(lid int) engine = memory;     
        INSERT INTO tmp_locations2(lid) select lid from tmp_locations;
        -- Employees for the report
        DROP TEMPORARY TABLE IF EXISTS tmp_employees;
        CREATE TEMPORARY TABLE tmp_employees( empid INT PRIMARY KEY, empname VARCHAR(255), dateofjoin date, reporting_manager VARCHAR(255), locationid INT ) ENGINE=InnoDB;
      
        INSERT IGNORE INTO tmp_employees(empid, empname, dateofjoin, reporting_manager, locationid)
        SELECT DISTINCT e.id,  get_employee_name(e.id),e.dateofjoin,  (SELECT get_employee_name(rm.reportingmanagerid) FROM employee_reportingmanagers rm WHERE rm.empid = e.id AND rm.effectiveenddate IS NULL LIMIT 1), w.locationid
        FROM employee e
        LEFT JOIN employee_worklocations w ON e.id = w.empid and w.effectivetodate is null
        LEFT JOIN tmp_locations l ON l.lid = w.locationid OR (SELECT COUNT(*) FROM tmp_locations2) = 0
        LEFT JOIN employee_reportingmanagers rm ON rm.empid = e.id AND rm.effectiveenddate IS NULL
        LEFT JOIN tmp_managers m ON m.mid = rm.reportingmanagerid
        WHERE ((SELECT COUNT(*) FROM tmp_managers2) = 0 AND e.id = employee_id OR m.mid IS NOT NULL)
          AND (DATE(e.dateofjoin) <= vmonthstartdate OR MONTH(e.dateofjoin) = MONTH(vmonthstartdate))
          AND (e.status = 1 
               OR EXISTS (SELECT 1 FROM ems_employee_resignations er WHERE er.empid = e.id AND DATE(er.actual_relieving_date) BETWEEN vmonthstartdate AND vmonthenddate)
               OR EXISTS (SELECT 1 FROM ems_employee_terminations et WHERE et.empid = e.id AND DATE(et.termination_date) BETWEEN vmonthstartdate AND vmonthenddate));
      
        -- Employee shifts for month
        DROP TEMPORARY TABLE IF EXISTS tmp_shifts;
        CREATE TEMPORARY TABLE tmp_shifts( empid INT, fromdate DATE, todate DATE, mhfd TIME, mhhd TIME, shift_fromtime TIME, shift_grace_intime TIME, PRIMARY KEY(empid, fromdate, todate) ) ENGINE=InnoDB;
      
        INSERT INTO tmp_shifts(empid, fromdate, todate, mhfd, mhhd, shift_fromtime, shift_grace_intime)
        SELECT s.empid, s.fromdate, s.todate, m.min_hours_for_full_day_present, m.min_hours_for_half_day_present, m.fromtime, m.graceperiod_intime
        FROM employee_shift_details s
        JOIN shiftsmaster m ON s.shiftid = m.id
        WHERE s.empid IN (SELECT empid FROM tmp_employees)
          AND (vmonthstartdate BETWEEN s.fromdate AND s.todate OR vmonthenddate BETWEEN s.fromdate AND s.todate OR s.fromdate BETWEEN vmonthstartdate AND vmonthenddate OR s.todate BETWEEN vmonthstartdate AND vmonthenddate);
      
        -- Holidays per location
        DROP TEMPORARY TABLE IF EXISTS tmp_holidays;
        CREATE TEMPORARY TABLE tmp_holidays(locationid INT, holiday_date DATE, PRIMARY KEY(locationid, holiday_date)) ENGINE=InnoDB;
      
        INSERT INTO tmp_holidays(locationid, holiday_date)
        SELECT v.id, h.date FROM holidaysmaster h JOIN companyworklocationsmaster v ON h.location = v.city  WHERE h.is_optional_holiday = 0; -- AND h.leave_cycle_year = (SELECT fn_get_leave_cycle_year()) 
        
         DROP TEMPORARY TABLE IF EXISTS tmp_opt_holidays;
		CREATE TEMPORARY TABLE tmp_opt_holidays(empid int, holiday_date DATE, PRIMARY KEY(empid, holiday_date)) ENGINE=InnoDB;
      
		INSERT INTO tmp_opt_holidays(empid, holiday_date)
		select oh.employee_id, date(oh.date) from lm_employee_utilized_optional_holidays oh where oh.employee_id in(select t.empid from tmp_employees t) and date(oh.date) BETWEEN vmonthstartdate AND vmonthenddate 
			and oh.status in (1,2);  -- and oh.leave_cycle_year=fn_get_leave_cycle_year() 
        
        -- Weekoffs per employee
        DROP TEMPORARY TABLE IF EXISTS tmp_weekoffs;
        CREATE TEMPORARY TABLE tmp_weekoffs(empid INT, weekoff_date DATE, PRIMARY KEY(empid, weekoff_date)) ENGINE=InnoDB;
      
        INSERT INTO tmp_weekoffs(empid, weekoff_date)
        SELECT w.empid, d.attdate FROM tmp_employees e JOIN employee_weekoffs w ON e.empid = w.empid  JOIN tmp_dates d  ON d.attdate BETWEEN w.effectivefromdate AND IFNULL(w.effectivetodate, CURRENT_DATE())
         AND DAYOFWEEK(d.attdate) IN (IFNULL(w.weekoffday1,0), IFNULL(w.weekoffday2,0), IFNULL(w.weekoffday3,0));
      
        -- Leaves & Sandwich precomputed
        DROP TEMPORARY TABLE IF EXISTS tmp_leaves;
        CREATE TEMPORARY TABLE tmp_leaves(empid INT, leave_date DATE, leave_marker VARCHAR(2), PRIMARY KEY(empid, leave_date)) ENGINE=InnoDB;
      
        INSERT INTO tmp_leaves(empid, leave_date, leave_marker)
        SELECT ll.empid, d.attdate,
               CASE WHEN MIN(IFNULL(ll.fromhalfdayleave,0))=1 OR MIN(IFNULL(ll.tohalfdayleave,0))=1 OR MAX(IFNULL(ll.fromhalfdayleave,0))=1 OR MAX(IFNULL(ll.tohalfdayleave,0))=1
                    THEN 'HL' ELSE 'L' END
        FROM lm_employeeleaves ll
        JOIN tmp_employees e ON e.empid = ll.empid
        JOIN tmp_dates d ON d.attdate BETWEEN ll.fromdate AND ll.todate
        WHERE ll.leavestatus='Approved'
        GROUP BY ll.empid, d.attdate;
      
        DROP TEMPORARY TABLE IF EXISTS tmp_sandwich;
        CREATE TEMPORARY TABLE tmp_sandwich(empid INT, sandwich_date DATE, PRIMARY KEY(empid, sandwich_date)) ENGINE=InnoDB;
      
        INSERT INTO tmp_sandwich(empid, sandwich_date)
        SELECT ld.empid, d.attdate FROM lm_leave_policy_deductions ld JOIN tmp_employees e ON e.empid = ld.empid JOIN tmp_dates d ON d.attdate BETWEEN DATE(ld.fromdate) AND DATE(ld.todate) WHERE ld.leavestatus='Approved' AND IFNULL(ld.leavecount,0)>0;
      
        -- Attendance per day join with all precomputed data
        DROP TEMPORARY TABLE IF EXISTS tmp_attendance;
        CREATE TEMPORARY TABLE tmp_attendance( empid INT,attdate DATE, present_or_absent VARCHAR(4), islate CHAR(1), sandwich CHAR(1),PRIMARY KEY(empid, attdate)) ENGINE=InnoDB;
      
        INSERT IGNORE INTO tmp_attendance(empid, attdate, present_or_absent, islate, sandwich)
        SELECT e.empid, d.attdate, 
              CASE 
                 WHEN d.attdate < e.dateofjoin THEN ' '
                 WHEN w.weekoff_date IS NOT NULL AND a.attendancedate IS NOT NULL THEN 'WP' WHEN w.weekoff_date IS NOT NULL THEN 'W'
                 WHEN h.holiday_date IS NOT NULL AND a.attendancedate IS NOT NULL THEN 'HP' WHEN h.holiday_date IS NOT NULL THEN 'H'
                 WHEN toh.holiday_date IS NOT NULL AND a.attendancedate IS NOT NULL THEN 'HP' WHEN toh.holiday_date IS NOT NULL THEN 'H'
                WHEN a.attendancedate IS NOT NULL THEN
                      CASE WHEN a.halfdayattendance<>0 AND a.attendancesource='Regularization' THEN 'HD'
                           WHEN a.attendancesource='Regularization' AND a.halfdayattendance=0 THEN 'P'
                           WHEN l.leave_marker='HL' THEN 'HD'
                          WHEN l.leave_marker='L' THEN 'L'
                          WHEN s.mhfd IS NOT NULL AND TIMEDIFF(a.lastlogouttime, a.firstlogintime)<s.mhfd THEN 'HD'
                         ELSE 'P' END
                 WHEN l.leave_marker IS NOT NULL THEN l.leave_marker
                 ELSE 'A' END,
              
               CASE WHEN a.firstlogintime IS NOT NULL AND s.shift_fromtime IS NOT NULL 
                        AND a.firstlogintime > ADDTIME(ADDTIME(CONCAT(d.attdate,' 00:00:00'), s.shift_fromtime), s.shift_grace_intime)
                    THEN 'Y' ELSE 'N' END,
               CASE WHEN sd.sandwich_date IS NOT NULL THEN 'S' ELSE '' END
        FROM tmp_employees e
        CROSS JOIN tmp_dates d
        LEFT JOIN employee_attendance a ON a.empid=e.empid AND a.attendancedate=d.attdate
        LEFT JOIN tmp_shifts s ON s.empid=e.empid AND d.attdate BETWEEN s.fromdate AND s.todate
        LEFT JOIN tmp_holidays h ON h.locationid=e.locationid AND h.holiday_date=d.attdate
        LEFT JOIN tmp_weekoffs w ON w.empid=e.empid AND w.weekoff_date=d.attdate
        LEFT JOIN tmp_leaves l ON l.empid=e.empid AND l.leave_date=d.attdate
        LEFT JOIN tmp_sandwich sd ON sd.empid=e.empid AND sd.sandwich_date=d.attdate
        left join tmp_opt_holidays toh on toh.empid = e.empid and toh.holiday_date = d.attdate ;  
        -- =================================================================================
         UPDATE tmp_attendance m SET m.present_or_absent = REPLACE(m.present_or_absent, '"', ''), m.sandwich = REPLACE(m.sandwich, '"', ''),m.islate= REPLACE(m.islate, '"', '');   
     	
      	  drop temporary table if exists tbl_totals;
            create temporary table tbl_totals ( sid int auto_increment not null,rule varchar(150), rname varchar(30),squery mediumtext, primary key (sid) );
       	
           INSERT INTO tbl_totals (rule,rname,squery) values
       		( 'ltrim(rtrim(present_or_absent)) != ""', 'Employees Total',''),
             ('present_or_absent IN ("P","WP","HP","HD")', 'Presents Total',''),
             ('present_or_absent IN ("W")', 'Week-Offs Total',''),
       		('present_or_absent IN ("L")', 'Leaves Total',''),
             ('present_or_absent IN ("H")', 'Holidays Total',''),
             ('present_or_absent IN ("A")', 'Absents Total','');              
             
 			SET vtbl_count = ifnull((select count(*) from tbl_totals),0);
 			SET vemp_count = ifnull((select count(*) from tmp_employees),0);      
 			set vcol_format =   if( MONTH(vmonthstartdate) = MONTH(vmonthenddate), '%d_%a', '%d_%a (%b)');            
             SET vTmpDate =  vmonthstartdate;
              
      		WHILE (vTmpDate <= vmonthenddate and DAY(vTmpDate) <= 31) DO
      			SET vsql_dates = CONCAT( vsql_dates, '`', DATE_FORMAT(vTmpDate, vcol_format), '` VARCHAR(10) ,');
                 SET vcol_dates = CONCAT( vcol_dates, '`', DATE_FORMAT(vTmpDate, vcol_format), '`,');             
      			SET vcol_list = CONCAT(vcol_list, 'MAX(CASE WHEN attdate = ''', DATE_FORMAT(vTmpDate, '%Y-%m-%d'), ''' THEN present_or_absent ELSE NULL END) AS `', DATE_FORMAT(vTmpDate, vcol_format), '`, ');
      			SET vcol_empty = CONCAT(vcol_empty, '"" AS `', DATE_FORMAT(vTmpDate, vcol_format), '`, ');         
                 set vtbl_start = 1;
     			while(vtbl_start <= vtbl_count) DO				  	  
     				 set vcol_total = CONCAT('ifnull(CAST(SUM(CASE WHEN attdate = ''', DATE_FORMAT(vTmpDate, '%Y-%m-%d'), ''' and ',ifnull((select t.rule from tbl_totals t where t.sid = vtbl_start),''),' THEN 1 ELSE 0 END)AS DECIMAL(10,0)),0) AS `', DATE_FORMAT(vTmpDate, vcol_format), '`, ');
     				 update tbl_totals t set t.squery = concat(t.squery,vcol_total) where t.sid = vtbl_start;
     				   set vtbl_start = vtbl_start + 1;
     			end while;
                 SET vTmpDate = DATE_ADD(vTmpDate, INTERVAL 1 DAY); 			 
      		END WHILE;   
              
             drop temporary table if exists monthlyreportjson;
      		SET @sql_text = 'create temporary table monthlyreportjson (sid  int auto_increment,S_No varchar(5),Emp_id int,Employee_Id varchar(30),  Employee varchar(255), Reporting_Manager varchar(255), locationid int, Location varchar(255), ';
      		SET @sql_text = concat(@sql_text ,vsql_dates,'Absents decimal(10,2),  Presents decimal(10,2),  Late_Count decimal(10,2),   Total decimal(10,2) , key(sid) )');
      		
             PREPARE stmt FROM @sql_text;
      		EXECUTE stmt;
      		DEALLOCATE PREPARE stmt;        
     
      		SET @sql_text = CONCAT('INSERT INTO monthlyreportjson (S_No, Emp_id,Employee_Id, Employee, Reporting_Manager,locationid, Location, ', vcol_dates, ' Absents, Presents, Late_Count, Total) ',
              'SELECT  '''', m.empid,'''',  e.empname,e.reporting_manager,e.locationid,'''',',vcol_list,
      		'ifnull(CAST(SUM(CASE WHEN m.present_or_absent IN ("A","L") THEN 1 WHEN m.present_or_absent = "HD" THEN 0.5 WHEN m.sandwich = "S" THEN 1 ELSE 0 END) AS DECIMAL(10,2)),0),',
      		'ifnull(CAST(SUM(CASE WHEN m.present_or_absent IN ("P","W","WP","H","HP","HD") THEN CASE WHEN m.present_or_absent = "HD" THEN 0.5 ELSE 1 END WHEN m.sandwich = "S" THEN -1 END) AS DECIMAL(10,2)),0),'
      		'ifnull(CAST(SUM(CASE WHEN m.islate = "Y" THEN 1 ELSE 0 END) AS DECIMAL(10,2)),0) ,', 0,' FROM tmp_attendance m left join tmp_employees e on e.empid= m.empid GROUP BY m.empid order by e.empname,e.reporting_manager' );    
             
      		PREPARE stmtdata FROM @sql_text;
      		EXECUTE stmtdata;
      		DEALLOCATE PREPARE stmtdata;
             if exists(select *from monthlyreportjson)then
  				update monthlyreportjson j set j.S_No = j.sid,	
     		 							   j.Total = j.Absents+j.Presents,
     									   j.Employee_Id = (select e.empid from employee e where e.id = j.Emp_id limit 1),
     									   j.Location = (select wm.location from companyworklocationsmaster wm where wm.id = j.locationid);      
                                          
                if(vemp_count > 1)then  
 					SET @sql_text = CONCAT('INSERT INTO monthlyreportjson (Employee_Id, Employee, ', vcol_dates, ' Absents, Presents, Late_Count, Total) SELECT '''',''Totals'',',vcol_empty,'null,','null,','null ,', 'null');      
 					PREPARE stmtdata FROM @sql_text;
 					EXECUTE stmtdata;
 					DEALLOCATE PREPARE stmtdata;  
                     
 					SET @sql_text = '';   
 					set vtbl_start = 1;
 					 
 					while(vtbl_start <= vtbl_count) DO
 						 set vrname = (select t.rname from tbl_totals t where t.sid = vtbl_start);		
 						 set vsquery = (select t.squery from tbl_totals t where t.sid = vtbl_start);				 
 						 SET @sql_text = CONCAT('INSERT INTO monthlyreportjson(Employee_Id,Employee,',vcol_dates,'Absents, Presents, Late_Count, Total) SELECT '''',"',vrname, '", ',vsquery, 'null,null,null,null from  tmp_attendance;');			 
 							 
                             PREPARE stmttotal FROM @sql_text;
 							EXECUTE stmttotal;
 							DEALLOCATE PREPARE stmttotal;  		
 						 SET @sql_text = '';   
                          set vsquery = '',vrname = '';
 						 set vtbl_start = vtbl_start + 1;                  
 					 end while;  
                 end if; 
                 
             end if;
                
     	  SET @sql_text = CONCAT('select S_No, Employee,Employee_Id, Reporting_Manager, Location,',vcol_dates,'Absents, Presents, Late_Count, Total from  monthlyreportjson;');			 
     			PREPARE stmtresponse FROM @sql_text;
     			EXECUTE stmtresponse;
     			DEALLOCATE PREPARE stmtresponse;  		
             
        -- ------------------------------------------------------------------------------
        
   DROP TEMPORARY TABLE IF EXISTS tmp_dates;
   DROP TEMPORARY TABLE IF EXISTS tmp_employees;
   DROP TEMPORARY TABLE IF EXISTS tmp_managers;
   DROP TEMPORARY TABLE IF EXISTS tmp_managers2;
   DROP TEMPORARY TABLE IF EXISTS tmp_locations;
   DROP TEMPORARY TABLE IF EXISTS tmp_locations2;
   DROP TEMPORARY TABLE IF EXISTS tmp_shifts;
   DROP TEMPORARY TABLE IF EXISTS tmp_holidays;
   DROP TEMPORARY TABLE IF EXISTS tmp_weekoffs;
   DROP TEMPORARY TABLE IF EXISTS tmp_leaves;
   DROP TEMPORARY TABLE IF EXISTS tmp_sandwich;
   DROP TEMPORARY TABLE IF EXISTS tmp_attendance;
   DROP TEMPORARY TABLE IF EXISTS tmp_opt_holidays;
   END$$
   DELIMITER ;
-- -----------------------------------------------------------------------------------
-- ----------------------------------PAYROLL - EMPLOYEE REPORT NEW FIELDS ADDED ---------- 
 
DROP PROCEDURE IF EXISTS `get_ems_employee_data_for_reports`;
DELIMITER $$
CREATE PROCEDURE `get_ems_employee_data_for_reports`(
 in employee_id int,
 in employee_status_value text,
 in employee_type_value text,
 in department_value text,
 in designation_value mediumtext,
 in location_value text,
 in gender_value text,
 in blood_group_value text,
 in marital_status_value text,
 in shift_value text,
 in reporting_manager_value text,
 in search_string text
 )
 begin
 
 drop temporary table if exists configs_temp_table;
 create temporary table configs_temp_table (
   `employee_status` int DEFAULT NULL,
   `employee_type` int DEFAULT NULL,
   `department` int DEFAULT NULL,
   `designation` int DEFAULT NULL,
   `location` int DEFAULT NULL,
   `gender` int DEFAULT NULL,
   `blood_group` int DEFAULT NULL,
   `marital_status` int DEFAULT NULL,
   `shift` int DEFAULT NULL,
   `reporting_manager` int DEFAULT NULL
 );
 
 drop temporary table if exists emp_rm;
 create temporary table emp_rm (
 	empid int,
     emp_name varchar(255)
 );
 
 insert into configs_temp_table
 select employee_status,employee_type,department,designation,location,gender,blood_group,marital_status,
 shift,reporting_manager 
 from ems_employee_column_configuration_master
 where ems_employee_column_configuration_master.empid = employee_id;
 
 insert into emp_rm
 select id, get_employee_name(employee.id)
     from employee where id in (select employee_roles.employee_id from employee_roles where employee_roles.role_id = 2);
 
 insert into emp_rm
 select id, get_employee_name(employee.id)
     from employee where id in (select distinct empid from employee_reportingmanagers where empid = reportingmanagerid);
 set @sqltext = '';
 set @sqltext = concat('select distinct get_employee_name(e.id) as employee_name, e.empid as employee_code, 
     concat(ifnull(r.firstname,''''),case when (r.firstname is not null and r.lastname is not null) then concat(''' ''',r.lastname)
                                    else '''' end) as father_name,
     e.officeemail as office_email,
     e.contactnumber as contact_number, e.aadharnumber, efm.bankname, efm.ifsccode, efm.bankaccountnumber, 
     efm.uanumber, efm.pfaccountnumber, efm.pan, efm.esi ');
     if exists (select * from configs_temp_table where employee_status = 1) then 
 		set @sqltext = concat(@sqltext, ', (select statusmaster.name from statusmaster where statusmaster.id = e.status) as status');
     end if;
     if exists (select * from configs_temp_table where employee_type = 1) then 
 		set @sqltext = concat(@sqltext, ', (select employmenttypemaster.employmenttype from employmenttypemaster where employmenttypemaster.id = e.employmenttype) as employment_type');
     end if;
     if exists (select * from configs_temp_table where department = 1) then 
 		set @sqltext = concat(@sqltext, ', p.deptname  as department_name');
     end if;
     if exists (select * from configs_temp_table where designation = 1) then 
 		set @sqltext = concat(@sqltext, ', d.designation as designation');
     end if;
     if exists (select * from configs_temp_table where location = 1) then 
 		set @sqltext = concat(@sqltext, ', wm.location as work_location');
     end if;
     if exists (select * from configs_temp_table where gender = 1) then 
 		set @sqltext = concat(@sqltext, ', (select gendermaster.gender from gendermaster where gendermaster.id = e.gender) as gender');
     end if;
     if exists (select * from configs_temp_table where blood_group = 1) then 
 		set @sqltext = concat(@sqltext, ', (select bloodgroupmaster.bloodgroup from bloodgroupmaster where bloodgroupmaster.id = e.bloodgroup) as blood_group');
     end if;
     if exists (select * from configs_temp_table where marital_status = 1) then 
 		set @sqltext = concat(@sqltext, ', (select maritalstatusmaster.maritalstatus from maritalstatusmaster where maritalstatusmaster.id = e.maritalstatus) as marital_status');
     end if;
     if exists (select * from configs_temp_table where shift = 1) then 
 		set @sqltext = concat(@sqltext, ', s.shiftname  as shift_name');
     end if;
     if exists (select * from configs_temp_table where reporting_manager = 1) then 
 		set @sqltext = concat(@sqltext, ', (select distinct emp_rm.emp_name from emp_rm where emp_rm.empid = vv.reportingmanagerid) as reporting_manager');
     end if; 
 	set @sqltext = concat(@sqltext, ' from employee e left join employee_relations r on e.id = r.empid and r.relationship = 1');
     if exists (select * from configs_temp_table where designation = 1) then
 		set @sqltext = concat(@sqltext, ' left join 
             (select * from employee_designations eds where eds.id in (select max(id) as maxid from employee_designations group by empid)) ed on e.id = ed.empid
 			left join designationsmaster d on ed.designationid = d.id');
     end if;    
     if exists (select * from configs_temp_table where department = 1) then 
 		set @sqltext = concat(@sqltext, ' left join 
         (select * from employee_departments where id in (select max(id) from employee_departments group by empid)) dp on e.id = dp.empid
         left join departmentsmaster p on dp.departmentid = p.id');
     end if;
     if exists (select * from configs_temp_table where shift = 1) then 
 		set @sqltext = concat(@sqltext, ' left join employee_shift_details esd on e.id = esd.empid 
         and case when esd.todate is not null then (curdate() between esd.fromdate and esd.todate)
                  else curdate() <= esd.fromdate
                  end
 		left join shiftsmaster s on esd.shiftid = s.id');
 	end if; 
     if exists (select * from configs_temp_table where location = 1) then 
 		set @sqltext = concat(@sqltext, ' left join 
         (select * from employee_worklocations ws where ws.id in (select max(id) as maxid from employee_worklocations group by empid)) w on e.id = w.empid
 		left join companyworklocationsmaster wm on w.locationid = wm.id
 		left join locationsmaster v on wm.city = v.id');
 	end if; 
     if exists (select * from configs_temp_table where reporting_manager = 1) then 
 		set @sqltext = concat(@sqltext, ' left join 
         (select * from employee_reportingmanagers where id in (select max(id) from employee_reportingmanagers group by empid)) vv on e.id = vv.empid');
 	end if; 
     set @sqltext = concat(@sqltext, ' left join employee_financials_master efm on e.id = efm.empid where 1 = 1');
 	if exists (select * from configs_temp_table where employee_status = 1 and employee_status_value<> '[]') then 
 		set @sqltext = concat(@sqltext, ' and e.status in (',replace(replace(employee_status_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where employee_type = 1 and employee_type_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and e.employmenttype in (', replace(replace(employee_type_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where department = 1 and department_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and p.id in (', replace(replace(department_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where designation = 1 and designation_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and d.id in (', replace(replace(designation_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where location = 1 and location_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and wm.id in (', replace(replace(location_value,'[',''),']',''),')');
     end if;    
     if exists (select * from configs_temp_table where gender = 1 and gender_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and e.gender in (', replace(replace(gender_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where blood_group = 1 and blood_group_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and e.bloodgroup in (', replace(replace(blood_group_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where marital_status = 1 and marital_status_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and e.maritalstatus in (', replace(replace(marital_status_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where shift = 1 and shift_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and s.id in (', replace(replace(shift_value,'[',''),']',''),')');
     end if;
     if exists (select * from configs_temp_table where reporting_manager = 1 and reporting_manager_value<>'[]') then 
 		set @sqltext = concat(@sqltext, ' and vv.reportingmanagerid in (', replace(replace(reporting_manager_value,'[',''),']',''),')');
     end if; 
     if (search_string is not null) then
     set @sqltext = concat(@sqltext, ' and ( get_employee_name(e.id) like ''%', search_string,'%'' or e.officeemail like ''%', search_string,'%'' or 
     e.contactnumber like ''%',search_string,'%'')');
     end if;
     set @sqltext = concat(@sqltext, ' order by e.id');
     
 prepare stmt from @sqltext; 
 execute stmt;
 deallocate prepare stmt; 
 drop temporary table configs_temp_table;
 drop temporary table emp_rm;
 end$$
 DELIMITER ;
-- ------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `get_crm_active_employees_for_managers`;
DELIMITER $$
CREATE  PROCEDURE `get_crm_active_employees_for_managers`(
   	in `managers` text, 
      in `locations` text,
       in `selected_date` varchar(20),
       in `active_only` int
   )
 begin
   	declare manager_id int default 0;
   	declare vselecteddate datetime default date(fn_get_country_time(''));
      declare vmanagers text default '';
      declare vlocations text default '';
      declare vactive_only int default 0;
      declare vtoday datetime default date(fn_get_country_time(''));
       drop temporary table if exists templocations;
  		create temporary table templocations( sid int auto_increment not null, val varchar(255), key (sid) );
       
  	drop temporary table if exists temprms;
  		create temporary table temprms( sid int auto_increment not null, val varchar(255), key (sid) );
  	drop temporary table if exists temprms2; 
  		create temporary table temprms2( sid int auto_increment not null, val varchar(255), key (sid) );     
  	
      drop temporary table if exists selected_emp;
   		create temporary table selected_emp ( sid int auto_increment not null, empid int,attendance_id int, primary key (sid));
      
   	if(`selected_date` is null or `selected_date` = '') then
   		set vselecteddate = date(fn_get_country_time(''));
  	else 
  		set vselecteddate = date(`selected_date`);
   	end if;
      set vactive_only = coalesce(`active_only`,0);
      set vlocations = replace(replace(`locations`,'[',''),']','');   
   	set @sql_loc = concat("insert into templocations (val) values ('", replace(( select vlocations as data), ",", "'),('"),"');"); 
   	prepare stmt from @sql_loc;
   	execute stmt;
   	deallocate prepare stmt;
       
      if (`managers` is null or `managers` = '[0]' or `managers` = '[]' ) then
  		 insert into selected_emp(empid,attendance_id) 
 			
 		(select distinct er.empid,(select id from employee_attendance eat where eat.empid = er.empid and  date(eat.attendancedate) = vselecteddate limit 1) 
 			from employee_reportingmanagers er inner join employee e on e.id = er.empid left join employee_worklocations w on e.id = w.empid  
 						where vselecteddate between er.effectivestartdate and ifnull(er.effectiveenddate,vtoday) 
 					  and w.locationid in (select if(val=0,w.locationid,val) from templocations) and vselecteddate between w.effectivefromdate and ifnull(w.effectivetodate,vtoday)                        
 					and er.empid in (select distinct erl.employee_id from employee_roles erl where erl.role_id in (12,13,14) and vselecteddate between erl.effective_from_date and ifnull(effective_to_date,vtoday) ) 
 					  AND (DATE(e.dateofjoin) <= vselecteddate )
 					AND (case when vactive_only = 0 then 1=1 else  (e.status = 1 
 					   OR EXISTS (SELECT 1 FROM ems_employee_resignations ers WHERE ers.empid = e.id AND vselecteddate <= DATE(ers.actual_relieving_date) and ers.status in('Approved') )
 					   OR EXISTS (SELECT 1 FROM ems_employee_terminations et WHERE et.empid = e.id AND vselecteddate <= DATE(et.termination_date) and et.status in('Approved','Submitted') ) ) end
 					  ));
      
     else
   		set vmanagers = replace(replace(`managers`,'[',''),']','');
   		set @sql_mgr = concat("insert into temprms (val) values ('", replace(( select vmanagers as data), ",", "'),('"),"');"); 	
   		prepare stmt from @sql_mgr;
   		execute stmt;
   		deallocate prepare stmt;
           
           insert into temprms2(val) select val from temprms;
           
           insert into selected_emp(empid,attendance_id) 
   			(select distinct er.empid,(select id from employee_attendance eat where eat.empid = er.empid and  date(eat.attendancedate) = vselecteddate limit 1) 
   				from employee_reportingmanagers er inner join employee e on e.id = er.empid left join employee_worklocations w on e.id = w.empid 
   					where er.reportingmanagerid in (select val from temprms) and vselecteddate between er.effectivestartdate and ifnull(er.effectiveenddate,vtoday) 
  						--  and w.locationid in (select if(val=0,w.locationid,val) from templocations) and vselecteddate between w.effectivefromdate and ifnull(w.effectivetodate,vtoday)                         
   						and er.empid in (select distinct erl.employee_id from employee_roles erl where erl.role_id in (12,13,14) and vselecteddate between erl.effective_from_date and ifnull(effective_to_date,vtoday) )
                           AND (DATE(e.dateofjoin) <= vselecteddate OR MONTH(e.dateofjoin) = MONTH(vselecteddate))
   						AND (case when vactive_only = 0 then 1=1 else  (e.status = 1 
   						   OR EXISTS (SELECT 1 FROM ems_employee_resignations ers WHERE ers.empid = e.id AND vselecteddate <= DATE(ers.actual_relieving_date) and ers.status in('Approved') )
   						   OR EXISTS (SELECT 1 FROM ems_employee_terminations et WHERE et.empid = e.id AND vselecteddate <= DATE(et.termination_date) and et.status in('Approved','Submitted') ) ) end
                           ));
   			 
       end if; 
       
    -- if exists(select *from temprms where val not in(select empid from selected_emp) ) then
  	-- 	 insert into selected_emp(empid,attendance_id) 
  	-- 		(select distinct e.id,(select id from employee_attendance eat where eat.empid = e.id and  date(eat.attendancedate) = vselecteddate limit 1)
     --  from employee e where e.id in(select val from temprms));
    -- end if;
    
    if not exists(select *from selected_emp where empid in(select val from temprms where val in(select er.employee_id from employee_roles er where er.role_id=4 and vselecteddate between er.effective_from_date and ifnull(er.effective_to_date,vtoday))))then
		insert into selected_emp(empid,attendance_id) 
		(select distinct t.val,(select id from employee_attendance eat where eat.empid = t.val and  date(eat.attendancedate) = vselecteddate limit 1) from temprms t 
			where t.val in(select er.employee_id from employee_roles er where er.role_id=4 and vselecteddate between er.effective_from_date and ifnull(er.effective_to_date,vtoday) ));
    end if;  
    
   	select distinct se.empid, get_employee_name(e.id)  empname ,e.empid as empcode, se.attendance_id,e.status emp_status,
   			e.contactnumber,e.officeemail,e.personalemail, ea.firstlogintime punchintime,
   			(select if(d.category = 'out',d.punchtime,'') from employee_attendance_details d where d.attendanceid = ea.id order by d.punchtime desc limit 1) punchouttime,             
   			(case when ifnull((select if(d.category = 'out',d.punchtime,'') from employee_attendance_details d where d.attendanceid = ea.id order by d.punchtime desc limit 1),'')!='' 
   			then 'Salmon'  when ifnull(ea.firstlogintime,'')!=''  then 'Green' else 'Black' end ) punchcolor
   			from selected_emp se inner join employee e on e.id = se.empid left join employee_attendance ea on ea.empid = e.id and  ea.attendancedate = vselecteddate order by se.empid;
               
   	drop temporary table if exists selected_emp;
  	drop temporary table if exists temprms;
  	drop temporary table if exists temprms2;
      drop temporary table if exists templocations;
   end$$
  DELIMITER ;
  
 -- ---------------------------------------------------
 DROP  PROCEDURE IF EXISTS `get_crm_employees_for_managers`;
DELIMITER $$
CREATE PROCEDURE `get_crm_employees_for_managers`(
 	in `rm_id`int, 
     in `selected_date` varchar(20)
 )
 begin
	DECLARE manager_id INT default 0;
 	declare selecteddate datetime default date(fn_get_country_time(''));
	set manager_id = COALESCE(`rm_id`, 0);
	
	if(`selected_date` is null or `selected_date` ='') then
		set selecteddate =  date(fn_get_country_time(''));
	else
		set selecteddate = `selected_date`;
	end if;
	 drop temporary table if exists selected_emp;
			create temporary table selected_emp ( sid int auto_increment not null, empid int,attendance_id int, primary key (sid));
			 
	 if(manager_id>0) then
	  insert into selected_emp(empid,attendance_id) 
		(select distinct er.empid,(select id from employee_attendance eat where eat.empid = er.empid and  date(eat.attendancedate) = selecteddate limit 1) 
			from employee_reportingmanagers er 			
				where er.reportingmanagerid = manager_id 
					and er.effectiveenddate is null
					 and er.empid in (select distinct erl.employee_id from employee_roles erl where erl.role_id in (12,13,14))  );
		if not exists(select *from selected_emp where empid = manager_id ) then
		  insert into selected_emp(empid,attendance_id) 
			(select distinct e.id,(select id from employee_attendance eat where eat.empid = e.id and  date(eat.attendancedate) = selecteddate limit 1) 
				from employee e where e.id = manager_id);
		 end if;
	 end if;
	 
			select distinct se.empid, get_employee_name(e.id)  empname ,e.empid as empcode, se.attendance_id,
				  e.contactnumber,e.officeemail,e.personalemail, ea.firstlogintime punchintime,
				  (select if(d.category = 'out',d.punchtime,'') from employee_attendance_details d where d.attendanceid = ea.id order by d.punchtime desc limit 1) punchouttime,             
				  (case when ifnull((select if(d.category = 'out',d.punchtime,'') from employee_attendance_details d where d.attendanceid = ea.id order by d.punchtime desc limit 1),'')!='' 
				  then 'Salmon'  when ifnull(ea.firstlogintime,'')!=''  then 'Green' else 'Black' end ) punchcolor
						from selected_emp se inner join employee e on e.id = se.empid left join employee_attendance ea on ea.empid = e.id and  ea.attendancedate=selecteddate;
         
 end$$
 DELIMITER ;
 -- --------------------------------------------------------
       
   

 DROP PROCEDURE IF EXISTS `get_location_wise_attendance_monthly_report`;
 DELIMITER $$
 CREATE PROCEDURE `get_location_wise_attendance_monthly_report`(
      IN `manager_employee_id` LONGTEXT, 
      IN `location_id` LONGTEXT,
      IN `employee_id` INT,
      IN `calendar_date` DATE
  )
 BEGIN
       DECLARE vmonthstartdate DATE;
       DECLARE vmonthenddate DATE;
       DECLARE vtotalmonthdays INT;
       DECLARE v_monthend_current_flag BOOLEAN DEFAULT FALSE;
       
        DECLARE vTmpDate date;
        DECLARE vtbl_count int default 0;
        DECLARE vemp_count int default 0;
        DECLARE vtbl_start INT DEFAULT 1;		
        DECLARE vsql_dates text default '';
         
        DECLARE vcol_dates text default '';
 	    DECLARE vcol_list text default '';
        DECLARE vcol_empty text default '';         
        DECLARE vcol_total text default '';       
        DECLARE vcol_format text default '';     
        DECLARE vsquery text default '';     
        DECLARE vrname text default '';   
     
       -- Month boundaries
       SET vmonthstartdate = LAST_DAY(calendar_date) + INTERVAL 1 DAY - INTERVAL 1 MONTH;
       SET v_monthend_current_flag = (vmonthstartdate = (LAST_DAY(CURRENT_DATE()) + INTERVAL 1 DAY - INTERVAL 1 MONTH));
     
       IF v_monthend_current_flag THEN
         SET vtotalmonthdays = DATEDIFF(CURRENT_DATE(), vmonthstartdate) + 1;
         SET vmonthenddate = CURRENT_DATE();
       ELSE
         SET vtotalmonthdays = DAY(LAST_DAY(calendar_date));
         SET vmonthenddate = LAST_DAY(vmonthstartdate);
       END IF;
     
       -- Temporary tables for fast processing
       DROP TEMPORARY TABLE IF EXISTS tmp_dates;
       CREATE TEMPORARY TABLE tmp_dates (attdate DATE PRIMARY KEY) ENGINE=InnoDB;
     
       INSERT IGNORE INTO tmp_dates(attdate)
       SELECT vmonthstartdate + INTERVAL n DAY
       FROM (
         SELECT a.n + b.n*10 AS n
         FROM (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
               UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a,
              (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
               UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
       ) numbers
       WHERE vmonthstartdate + INTERVAL n DAY <= vmonthenddate;
     
       -- Parse JSON once for managers and locations
       DROP TEMPORARY TABLE IF EXISTS tmp_managers;
       DROP TEMPORARY TABLE IF EXISTS tmp_managers2;
       CREATE TEMPORARY TABLE tmp_managers(mid INT PRIMARY KEY) ENGINE=MEMORY;
     
       INSERT IGNORE INTO tmp_managers(mid)
       SELECT CAST(j.val AS SIGNED)
       FROM JSON_TABLE(
             CASE 
               WHEN manager_employee_id IS NULL OR TRIM(manager_employee_id) = '' THEN '[]'
               WHEN JSON_VALID(manager_employee_id) = 1 THEN manager_employee_id
               ELSE CONCAT('[', manager_employee_id, ']')
             END,
             '$[*]' COLUMNS(val VARCHAR(200) PATH '$')
            ) AS j;
       CREATE temporary table tmp_managers2(mid int primary key) engine = memory;
       INSERT INTO tmp_managers2(mid) select mid from tmp_managers;
     
       DROP TEMPORARY TABLE IF EXISTS tmp_locations;
       DROP TEMPORARY TABLE IF EXISTS tmp_locations2;
       CREATE TEMPORARY TABLE tmp_locations(lid INT PRIMARY KEY) ENGINE=MEMORY;
     
       INSERT IGNORE INTO tmp_locations(lid)
       SELECT CAST(j.val AS SIGNED)
       FROM JSON_TABLE(
             CASE 
               WHEN location_id IS NULL OR TRIM(location_id) = '' THEN '[]'
               WHEN JSON_VALID(location_id) = 1 THEN location_id
               ELSE CONCAT('[', location_id, ']')
             END,
             '$[*]' COLUMNS(val VARCHAR(200) PATH '$')
            ) AS j;
       CREATE TEMPORARY TABLE tmp_locations2(lid int) engine = memory;     
       INSERT INTO tmp_locations2(lid) select lid from tmp_locations;
       -- Employees for the report
       DROP TEMPORARY TABLE IF EXISTS tmp_employees;
       CREATE TEMPORARY TABLE tmp_employees(
           empid INT PRIMARY KEY, 
           empcode VARCHAR(30),  
           empname VARCHAR(255), 
           dateofjoin date,
           reporting_manager VARCHAR(255),
           locationid INT
       ) ENGINE=InnoDB;
     
       INSERT IGNORE INTO tmp_employees(empid, empcode, empname, dateofjoin, reporting_manager, locationid)
       SELECT DISTINCT e.id,
              e.empid,
              get_employee_name(e.id),e.dateofjoin,
              (SELECT get_employee_name(rm.reportingmanagerid)
                 FROM employee_reportingmanagers rm
                 WHERE rm.empid = e.id AND rm.effectiveenddate IS NULL
                 LIMIT 1),
              w.locationid
       FROM employee e
       LEFT JOIN employee_worklocations w ON e.id = w.empid and w.effectivetodate is null
       LEFT JOIN tmp_locations l ON l.lid = w.locationid OR (SELECT COUNT(*) FROM tmp_locations2) = 0
       LEFT JOIN employee_reportingmanagers rm ON rm.empid = e.id AND rm.effectiveenddate IS NULL
       LEFT JOIN tmp_managers m ON m.mid = rm.reportingmanagerid
       WHERE ((SELECT COUNT(*) FROM tmp_managers2) = 0 AND e.id = employee_id OR m.mid IS NOT NULL)
         AND (DATE(e.dateofjoin) <= vmonthstartdate OR MONTH(e.dateofjoin) = MONTH(vmonthstartdate))
         AND (e.status = 1 
              OR EXISTS (SELECT 1 FROM ems_employee_resignations er WHERE er.empid = e.id AND DATE(er.actual_relieving_date) BETWEEN vmonthstartdate AND vmonthenddate)
              OR EXISTS (SELECT 1 FROM ems_employee_terminations et WHERE et.empid = e.id AND DATE(et.termination_date) BETWEEN vmonthstartdate AND vmonthenddate));
     
       -- Employee shifts for month
       DROP TEMPORARY TABLE IF EXISTS tmp_shifts;
       CREATE TEMPORARY TABLE tmp_shifts(
           empid INT, fromdate DATE, todate DATE, mhfd TIME, mhhd TIME, shift_fromtime TIME, shift_grace_intime TIME,
           PRIMARY KEY(empid, fromdate, todate)
       ) ENGINE=InnoDB;
     
       INSERT INTO tmp_shifts(empid, fromdate, todate, mhfd, mhhd, shift_fromtime, shift_grace_intime)
       SELECT s.empid, s.fromdate, s.todate, m.min_hours_for_full_day_present, m.min_hours_for_half_day_present, m.fromtime, m.graceperiod_intime
       FROM employee_shift_details s
       JOIN shiftsmaster m ON s.shiftid = m.id
       WHERE s.empid IN (SELECT empid FROM tmp_employees)
         AND (vmonthstartdate BETWEEN s.fromdate AND s.todate
              OR vmonthenddate BETWEEN s.fromdate AND s.todate
              OR s.fromdate BETWEEN vmonthstartdate AND vmonthenddate
              OR s.todate BETWEEN vmonthstartdate AND vmonthenddate);
     
       -- Holidays per location
       DROP TEMPORARY TABLE IF EXISTS tmp_holidays;
       CREATE TEMPORARY TABLE tmp_holidays(locationid INT, holiday_date DATE, PRIMARY KEY(locationid, holiday_date)) ENGINE=InnoDB;
     
       INSERT INTO tmp_holidays(locationid, holiday_date)
       SELECT v.id, h.date
       FROM holidaysmaster h
       JOIN companyworklocationsmaster v ON h.location = v.city
       WHERE h.is_optional_holiday = 0; -- AND h.leave_cycle_year = (SELECT fn_get_leave_cycle_year());
 
      DROP TEMPORARY TABLE IF EXISTS tmp_opt_holidays;
      CREATE TEMPORARY TABLE tmp_opt_holidays(empid int, holiday_date DATE, PRIMARY KEY(empid, holiday_date)) ENGINE=InnoDB;
      
      INSERT INTO tmp_opt_holidays(empid, holiday_date)
      select oh.employee_id, date(oh.date) from lm_employee_utilized_optional_holidays oh where oh.employee_id in(select t.empid from tmp_employees t) and date(oh.date) BETWEEN vmonthstartdate AND vmonthenddate 
		and oh.status in (1,2);  -- and oh.leave_cycle_year=fn_get_leave_cycle_year() 
	                             
       -- Weekoffs per employee
       DROP TEMPORARY TABLE IF EXISTS tmp_weekoffs;
       CREATE TEMPORARY TABLE tmp_weekoffs(empid INT, weekoff_date DATE, PRIMARY KEY(empid, weekoff_date)) ENGINE=InnoDB;
     
       INSERT INTO tmp_weekoffs(empid, weekoff_date)
       SELECT w.empid, d.attdate
       FROM tmp_employees e
       JOIN employee_weekoffs w ON e.empid = w.empid
       JOIN tmp_dates d
         ON d.attdate BETWEEN w.effectivefromdate AND IFNULL(w.effectivetodate, CURRENT_DATE())
        AND DAYOFWEEK(d.attdate) IN (IFNULL(w.weekoffday1,0), IFNULL(w.weekoffday2,0), IFNULL(w.weekoffday3,0));
     
       -- Leaves & Sandwich precomputed
       DROP TEMPORARY TABLE IF EXISTS tmp_leaves;
       CREATE TEMPORARY TABLE tmp_leaves(empid INT, leave_date DATE, leave_marker VARCHAR(2), PRIMARY KEY(empid, leave_date)) ENGINE=InnoDB;
     
       INSERT INTO tmp_leaves(empid, leave_date, leave_marker)
       SELECT ll.empid, d.attdate,
              CASE WHEN MIN(IFNULL(ll.fromhalfdayleave,0))=1 OR MIN(IFNULL(ll.tohalfdayleave,0))=1 OR MAX(IFNULL(ll.fromhalfdayleave,0))=1 OR MAX(IFNULL(ll.tohalfdayleave,0))=1
                   THEN 'HL' ELSE 'L' END
       FROM lm_employeeleaves ll
       JOIN tmp_employees e ON e.empid = ll.empid
       JOIN tmp_dates d ON d.attdate BETWEEN ll.fromdate AND ll.todate
       WHERE ll.leavestatus='Approved'
       GROUP BY ll.empid, d.attdate;
     
       DROP TEMPORARY TABLE IF EXISTS tmp_sandwich;
       CREATE TEMPORARY TABLE tmp_sandwich(empid INT, sandwich_date DATE, PRIMARY KEY(empid, sandwich_date)) ENGINE=InnoDB;
     
       INSERT INTO tmp_sandwich(empid, sandwich_date)
       SELECT ld.empid, d.attdate
       FROM lm_leave_policy_deductions ld
       JOIN tmp_employees e ON e.empid = ld.empid
       JOIN tmp_dates d ON d.attdate BETWEEN DATE(ld.fromdate) AND DATE(ld.todate)
       WHERE ld.leavestatus='Approved' AND IFNULL(ld.leavecount,0)>0;
     
       -- Attendance per day join with all precomputed data
       DROP TEMPORARY TABLE IF EXISTS tmp_attendance;
       CREATE TEMPORARY TABLE tmp_attendance(
           empid INT,
           attdate DATE,
           present_or_absent VARCHAR(4),         
           islate CHAR(1),
           sandwich CHAR(1),
           PRIMARY KEY(empid, attdate)
       ) ENGINE=InnoDB;
     
       INSERT IGNORE INTO tmp_attendance(empid, attdate, present_or_absent, islate, sandwich)
       SELECT e.empid, d.attdate, 
             CASE 
                WHEN d.attdate < e.dateofjoin THEN ' '
                WHEN w.weekoff_date IS NOT NULL AND a.attendancedate IS NOT NULL THEN 'WP' WHEN w.weekoff_date IS NOT NULL THEN 'W'
                WHEN h.holiday_date IS NOT NULL AND a.attendancedate IS NOT NULL THEN 'HP' WHEN h.holiday_date IS NOT NULL THEN 'H'
                WHEN toh.holiday_date IS NOT NULL AND a.attendancedate IS NOT NULL THEN 'HP' WHEN toh.holiday_date IS NOT NULL THEN 'H'
               WHEN a.attendancedate IS NOT NULL THEN
                     CASE WHEN a.halfdayattendance<>0 AND a.attendancesource='Regularization' THEN 'HD'
                          WHEN a.attendancesource='Regularization' AND a.halfdayattendance=0 THEN 'P'
                          WHEN l.leave_marker='HL' THEN 'HD'
                         WHEN l.leave_marker='L' THEN 'L'
                         WHEN s.mhfd IS NOT NULL AND TIMEDIFF(a.lastlogouttime, a.firstlogintime)<s.mhfd THEN 'HD'
                        ELSE 'P' END
                WHEN l.leave_marker IS NOT NULL THEN l.leave_marker
                ELSE 'A' END,
             
              CASE WHEN a.firstlogintime IS NOT NULL AND s.shift_fromtime IS NOT NULL 
                       AND a.firstlogintime > ADDTIME(ADDTIME(CONCAT(d.attdate,' 00:00:00'), s.shift_fromtime), s.shift_grace_intime)
                   THEN 'Y' ELSE 'N' END,
              CASE WHEN sd.sandwich_date IS NOT NULL THEN 'S' ELSE '' END
       FROM tmp_employees e
       CROSS JOIN tmp_dates d
       LEFT JOIN employee_attendance a ON a.empid=e.empid AND a.attendancedate=d.attdate
       LEFT JOIN tmp_shifts s ON s.empid=e.empid AND d.attdate BETWEEN s.fromdate AND s.todate
       LEFT JOIN tmp_holidays h ON h.locationid=e.locationid AND h.holiday_date=d.attdate
       LEFT JOIN tmp_weekoffs w ON w.empid=e.empid AND w.weekoff_date=d.attdate
       LEFT JOIN tmp_leaves l ON l.empid=e.empid AND l.leave_date=d.attdate
       LEFT JOIN tmp_sandwich sd ON sd.empid=e.empid AND sd.sandwich_date=d.attdate
       left join tmp_opt_holidays toh on toh.empid = e.empid and toh.holiday_date = d.attdate ; 
       -- -------------------------------------------------------------------------------
       UPDATE tmp_attendance m SET m.present_or_absent = REPLACE(m.present_or_absent, '"', ''), m.sandwich = REPLACE(m.sandwich, '"', ''),m.islate= REPLACE(m.islate, '"', '');   
     	
      	  drop temporary table if exists tbl_totals;
            create temporary table tbl_totals ( sid int auto_increment not null,rule varchar(150), rname varchar(30),squery mediumtext, primary key (sid) );
       	
           INSERT INTO tbl_totals (rule,rname,squery) values
       		( 'ltrim(rtrim(present_or_absent)) != ""', 'Employees Total',''),
             ('present_or_absent IN ("P","WP","HP","HD")', 'Presents Total',''),
             ('present_or_absent IN ("W")', 'Week-Offs Total',''),
       		('present_or_absent IN ("L")', 'Leaves Total',''),
             ('present_or_absent IN ("H")', 'Holidays Total',''),
             ('present_or_absent IN ("A")', 'Absents Total','');              
             
 			SET vtbl_count = ifnull((select count(*) from tbl_totals),0);
 			SET vemp_count = ifnull((select count(*) from tmp_employees),0);      
 			set vcol_format =   if( MONTH(vmonthstartdate) = MONTH(vmonthenddate), '%d_%a', '%d_%a (%b)');            
             SET vTmpDate =  vmonthstartdate;
              
      		WHILE (vTmpDate <= vmonthenddate and DAY(vTmpDate) <= 31) DO
      			SET vsql_dates = CONCAT( vsql_dates, '`', DATE_FORMAT(vTmpDate, vcol_format), '` VARCHAR(10) ,');
                 SET vcol_dates = CONCAT( vcol_dates, '`', DATE_FORMAT(vTmpDate, vcol_format), '`,');             
      			SET vcol_list = CONCAT(vcol_list, 'MAX(CASE WHEN attdate = ''', DATE_FORMAT(vTmpDate, '%Y-%m-%d'), ''' THEN present_or_absent ELSE NULL END) AS `', DATE_FORMAT(vTmpDate, vcol_format), '`, ');
      			SET vcol_empty = CONCAT(vcol_empty, '"" AS `', DATE_FORMAT(vTmpDate, vcol_format), '`, ');         
                 set vtbl_start = 1;
     			while(vtbl_start <= vtbl_count) DO				  	  
     				 set vcol_total = CONCAT('ifnull(CAST(SUM(CASE WHEN attdate = ''', DATE_FORMAT(vTmpDate, '%Y-%m-%d'), ''' and ',ifnull((select t.rule from tbl_totals t where t.sid = vtbl_start),''),' THEN 1 ELSE 0 END)AS DECIMAL(10,0)),0) AS `', DATE_FORMAT(vTmpDate, vcol_format), '`, ');
     				 update tbl_totals t set t.squery = concat(t.squery,vcol_total) where t.sid = vtbl_start;
     				   set vtbl_start = vtbl_start + 1;
     			end while;
                 SET vTmpDate = DATE_ADD(vTmpDate, INTERVAL 1 DAY); 			 
      		END WHILE;   
              
             drop temporary table if exists monthlyreportjson;
      		SET @sql_text = 'create temporary table monthlyreportjson (sid  int auto_increment,S_No varchar(5),Emp_id int,Employee_Id varchar(30),  Employee varchar(255), Reporting_Manager varchar(255), locationid int, Location varchar(255), ';
      		SET @sql_text = concat(@sql_text ,vsql_dates,'Absents decimal(10,2),  Presents decimal(10,2),  Late_Count decimal(10,2),   Total decimal(10,2) , key(sid) )');
      		
             PREPARE stmt FROM @sql_text;
      		EXECUTE stmt;
      		DEALLOCATE PREPARE stmt;        
     
      		SET @sql_text = CONCAT('INSERT INTO monthlyreportjson (S_No, Emp_id,Employee_Id, Employee, Reporting_Manager,locationid, Location, ', vcol_dates, ' Absents, Presents, Late_Count, Total) ',
              'SELECT  '''', m.empid,'''',  e.empname,e.reporting_manager,e.locationid,'''',',vcol_list,
      		'ifnull(CAST(SUM(CASE WHEN m.present_or_absent IN ("A","L") THEN 1 WHEN m.present_or_absent = "HD" THEN 0.5 WHEN m.sandwich = "S" THEN 1 ELSE 0 END) AS DECIMAL(10,2)),0),',
      		'ifnull(CAST(SUM(CASE WHEN m.present_or_absent IN ("P","W","WP","H","HP","HD") THEN CASE WHEN m.present_or_absent = "HD" THEN 0.5 ELSE 1 END WHEN m.sandwich = "S" THEN -1 END) AS DECIMAL(10,2)),0),'
      		'ifnull(CAST(SUM(CASE WHEN m.islate = "Y" THEN 1 ELSE 0 END) AS DECIMAL(10,2)),0) ,', 0,' FROM tmp_attendance m left join tmp_employees e on e.empid= m.empid GROUP BY m.empid order by e.empname,e.reporting_manager' );    
             
      		PREPARE stmtdata FROM @sql_text;
      		EXECUTE stmtdata;
      		DEALLOCATE PREPARE stmtdata;
             if exists(select *from monthlyreportjson)then
  				update monthlyreportjson j set j.S_No = j.sid,	
     		 							   j.Total = j.Absents+j.Presents,
     									   j.Employee_Id = (select e.empid from employee e where e.id = j.Emp_id limit 1),
     									   j.Location = (select wm.location from companyworklocationsmaster wm where wm.id = j.locationid);      
                                          
                if(vemp_count > 1)then  
 					SET @sql_text = CONCAT('INSERT INTO monthlyreportjson (Employee_Id, Employee, ', vcol_dates, ' Absents, Presents, Late_Count, Total) SELECT '''',''Totals'',',vcol_empty,'null,','null,','null ,', 'null');      
 					PREPARE stmtdata FROM @sql_text;
 					EXECUTE stmtdata;
 					DEALLOCATE PREPARE stmtdata;  
                     
 					SET @sql_text = '';   
 					set vtbl_start = 1;
 					 
 					while(vtbl_start <= vtbl_count) DO
 						 set vrname = (select t.rname from tbl_totals t where t.sid = vtbl_start);		
 						 set vsquery = (select t.squery from tbl_totals t where t.sid = vtbl_start);				 
 						 SET @sql_text = CONCAT('INSERT INTO monthlyreportjson(Employee_Id,Employee,',vcol_dates,'Absents, Presents, Late_Count, Total) SELECT '''',"',vrname, '", ',vsquery, 'null,null,null,null from  tmp_attendance;');			 
 							 
                             PREPARE stmttotal FROM @sql_text;
 							EXECUTE stmttotal;
 							DEALLOCATE PREPARE stmttotal;  		
 						 SET @sql_text = '';   
                          set vsquery = '',vrname = '';
 						 set vtbl_start = vtbl_start + 1;                  
 					 end while;  
                 end if; 
                 
             end if;
                
     	  SET @sql_text = CONCAT('select S_No, Employee,Employee_Id, Reporting_Manager, Location,',vcol_dates,'Absents, Presents, Late_Count, Total from  monthlyreportjson;');			 
     			PREPARE stmtresponse FROM @sql_text;
     			EXECUTE stmtresponse;
     			DEALLOCATE PREPARE stmtresponse;  				
            
       -- ------------
       
  DROP TEMPORARY TABLE IF EXISTS tmp_dates;
  DROP TEMPORARY TABLE IF EXISTS tmp_employees;
  DROP TEMPORARY TABLE IF EXISTS tmp_managers;
  DROP TEMPORARY TABLE IF EXISTS tmp_managers2;
  DROP TEMPORARY TABLE IF EXISTS tmp_locations;
  DROP TEMPORARY TABLE IF EXISTS tmp_locations2;
  DROP TEMPORARY TABLE IF EXISTS tmp_shifts;
  DROP TEMPORARY TABLE IF EXISTS tmp_holidays;
  DROP TEMPORARY TABLE IF EXISTS tmp_weekoffs;
  DROP TEMPORARY TABLE IF EXISTS tmp_leaves;
  DROP TEMPORARY TABLE IF EXISTS tmp_sandwich;
  DROP TEMPORARY TABLE IF EXISTS tmp_attendance;
  DROP TEMPORARY TABLE IF EXISTS tmp_opt_holidays;
  END$$
  DELIMITER ;
  -- ------------------------------------------------------------------------------------------


DROP FUNCTION IF EXISTS `fn_get_employee_day_working_status`;
DELIMITER $$
CREATE FUNCTION `fn_get_employee_day_working_status`(`empid` int,`date_selected` date ) RETURNS varchar(20) CHARSET utf8mb4
 begin
    	DECLARE rtn_val varchar(2);
        DECLARE f_isweekoff varchar(2);
        DECLARE fholiday varchar(2);
        DECLARE fleave varchar(2);
        DECLARE fattendance_id int;
        DECLARE fhalfdayattendance int;
        DECLARE fattendancesource varchar(20);    
        DECLARE fmh_fullday time;
        DECLARE fmh_halfday time;
        DECLARE fleave_id int;
        DECLARE fshift_id int;
        declare vpid int;
 	  declare vp_leavetype int;
 
       set rtn_val = 'A';  
       set fattendance_id = 0;
       set fleave_id = 0;
        set fhalfdayattendance = 0;
    	if( coalesce(`empid`,0) = 0 or coalesce(`date_selected`,'') = '')then 		 
             set rtn_val = ''; 
    	elseif exists(select *from employee e where e.id = `empid` and date(e.dateofjoin) >= date(`date_selected`) )then		 
             set rtn_val = ''; 
    	else		    
    			set fattendance_id = ifnull((select fa.id from employee_attendance fa where fa.attendancedate = date(`date_selected`) and fa.empid = `empid` limit 1),0);                
    			set f_isweekoff = ifnull((select 'W' from employee_weekoffs v where ( date(`date_selected`) between v.effectivefromdate and ifnull(v.effectivetodate,current_date())) and v.empid = `empid` 
    										and dayofweek(date(`date_selected`)) in (ifnull(v.weekoffday1,0),ifnull(v.weekoffday2,0),ifnull(v.weekoffday3,0))  limit 1),''); 
                if(f_isweekoff <> '')then				  
                      set rtn_val = if(fattendance_id > 0, 'WP',f_isweekoff);
                else			
    					set fholiday =  ifnull((select 'H' FROM holidaysmaster m inner join companyworklocationsmaster v  on m.location = v.city where m.date = date(`date_selected`)
 											and v.id =(select s.locationid from employee_worklocations s where s.empid = `empid` and  date(`date_selected`) between s.effectivefromdate and ifnull(s.effectivetodate,current_date()) order by s.id desc limit 1) 
 											-- and m.leave_cycle_year = fn_get_leave_cycle_year() 
                                            and m.is_optional_holiday= 0 limit 1),'');
    				   -- handle optional holidays here
    					if (fholiday <> 'H') then
    						if exists (select * from lm_employee_utilized_optional_holidays oh where oh.employee_id = `empid` and date(oh.date) = date(`date_selected`) 
											-- and oh.leave_cycle_year=fn_get_leave_cycle_year() 
                                            and oh.status in (1,2)) then
    							set fholiday = 'H';
    						end if;
    					end if;  					 
    					if(fholiday <> '')then						 
                             set rtn_val = if(fattendance_id > 0, 'HP',fholiday);
    					else				
    							set fhalfdayattendance = ifnull((select fa.halfdayattendance from employee_attendance fa where fa.id = fattendance_id limit 1),0);                               
    							set fattendancesource = ifnull((select fa.attendancesource from employee_attendance fa where fa.id = fattendance_id limit 1),'');                               
                                set fshift_id = ifnull((select fa.shiftid from employee_attendance fa where fa.id = fattendance_id limit 1),0);  
                                if(fshift_id = 0)then
                                 	set fshift_id = ifnull((select s.shiftid from employee_shift_details s where s.empid = empid and date(`date_selected`) between date(s.fromdate) and date(s.todate) order by s.fromdate limit 1),0);
    				            end if;
                                if(fattendance_id>0 and fattendancesource='Regularization')then								 
                                     set rtn_val = if(fhalfdayattendance=1,'HD','P');	
    							else
    								set fleave = '';
    								set vpid = (select s.value from lm_rulevalues s where s.ruleid = (select m.id from lm_rulemaster m where m.rulename = 'COMPANY_LEAVE_POLICY_TYPE') and date(`date_selected`) between s.effectivefromdate and  ifnull(s.effectivetodate,current_date()) limit 1);
    								set vp_leavetype = ifnull((select s.id from lm_leavesmaster s inner join lm_employee_lpolicy_id_mapping_master m on m.policy_id = s.policy_id 
 															where m.employee_id = `empid` and (date(`date_selected`) between effective_from_date and ifnull(effective_to_date,current_date())) 
 															and s.leavename = 'Loss of Pay Leave' and s.policy_id is not null limit 1),0);
 								if(vp_leavetype > 0)then
 									if exists(select * from lm_employeeleaves s where (date(`date_selected`) between s.fromdate and s.todate) and s.empid= `empid` and s.leavestatus in ('Submitted','Approved') 
 											and s.leavetype = (case when vpid = 1 then 10 when vpid = 2 then vp_leavetype end)) then
 										set fleave = 'LP'; 
                                      end if;                                    
    								end if;
                                 if(ifnull(fleave,'') = '')then
    									set fleave = (select (case when concat(group_concat(s.fromhalfdayleave separator ','),',',group_concat(s.tohalfdayleave separator ',')) in ('0,1,1,0','1,0,0,1') then 'L' -- this is to handle scenario of same day 2 separate halfday leave request exists
    													when (date(s.fromdate)=date(`date_selected`) and (date(s.fromdate)<>date(s.todate))) and leavecount>1 then 'L'
    													when (date(s.fromdate)=date(`date_selected`) and (s.fromhalfdayleave=1 or s.tohalfdayleave=1)) 
                                                      or (date(s.todate)=date(`date_selected`) and (s.fromhalfdayleave=1 or s.tohalfdayleave=1)) then 'HL'
    													when (s.fromhalfdayleave=0 and s.tohalfdayleave=0) then 'L' end) from lm_employeeleaves s
 														where date(`date_selected`) between s.fromdate and s.todate and s.empid= `empid` and s.leavestatus in ('Submitted','Approved')  limit 1);
    								end if;	  
    								set fmh_fullday = ifnull((select s.min_hours_for_full_day_present from shiftsmaster s where s.id = fshift_id limit 1),'00:00:00');         
                                  set fmh_halfday = ifnull((select s.min_hours_for_half_day_present from shiftsmaster s where s.id = fshift_id limit 1),'00:00:00');         
                                    if(fattendance_id>0)then
 										if(fleave = 'HL' )then
 											set rtn_val = 'HD';
 										elseif(fleave = 'L' )then
 											set rtn_val = 'L';
 										elseif exists(select *from employee_attendance fa where fa.id=fattendance_id and  timediff(fa.lastlogouttime,fa.firstlogintime) < fmh_fullday )then
 											set rtn_val = 'HD'; 
 										elseif(fattendance_id>0 )then        
 											set rtn_val = 'P';  
 										-- elseif exists(select *from employee_attendance fa where fa.id=fattendance_id and  timediff(fa.lastlogouttime,fa.firstlogintime) < fmh_halfday )then -- added new condition
 										-- 	set rtn_val = 'A';  
 										end if;
                                    elseif(ifnull(fleave,'') != '')then        
 										set rtn_val = fleave;                                
                                    else set rtn_val = 'A';                                
                                    end if; 								
    							end if;
    					end if;		
                end if;			
    	end if;
    	return rtn_val;
    end$$
    DELIMITER ;
    -- -------------------------------------------------------------------------------------

      
DROP PROCEDURE IF EXISTS `get_crm_managers_for_branches`;
DELIMITER $$
CREATE PROCEDURE `get_crm_managers_for_branches`(
 	in locations mediumtext, -- json format : [0] - for all , [20,34,65]
    in date_selected datetime,
    in active_only int
 	)
 begin
	declare v_active_only int default 0;
    declare v_date date default date(fn_get_country_time(''));
    declare v_today date default date(fn_get_country_time(''));
	set v_active_only = coalesce(active_only,0);
       
    if(ifnull(`date_selected`,'') != '') then     
		set v_date = DATE(date_selected);
    end if;

 	if (`locations` <> '[0]') then -- location is selected
    -- locations list   
       DROP TEMPORARY TABLE IF EXISTS tmpLocations;
       CREATE TEMPORARY TABLE tmpLocations (id INT PRIMARY KEY) ENGINE=MEMORY;
   	IF locations IS NOT NULL AND JSON_LENGTH(locations) > 0 THEN
           INSERT INTO tmpLocations(id) SELECT jt.value FROM JSON_TABLE(locations, '$[*]' COLUMNS(value INT PATH '$')) jt;           
       END IF;
		-- set vlocations_count =  (select count(*) from tmpLocations);   
         
                     
     select e.id as manager_emp_id,
     get_employee_name(e.id) as manager_name , 
     s.name mgr_status  
     from employee e left join statusmaster s on s.id = e.status
 		where e.id in (select s.reportingmanagerid from employee_reportingmanagers s where s.empid in (select ew.empid from employee_worklocations ew where 
                     ew.locationid in (select id from tmpLocations) and v_date between ew.effectivefromdate and ifnull(ew.effectivetodate,v_today))
                     and v_date between s.effectivestartdate and  ifnull(s.effectiveenddate,v_today) )  
         and e.id in (select distinct er.reportingmanagerid from employee_reportingmanagers er where v_date between er.effectivestartdate and  ifnull(er.effectiveenddate,v_today))
         and e.id in(select ers.employee_id from employee_roles ers where ers.role_id in (12,13,14) and v_date between ers.effective_from_date and ifnull(ers.effective_to_date,v_today) )
           AND (DATE(e.dateofjoin) <= v_date )
  						AND (case when v_active_only = 0 then 1=1 else  (e.status = 1 
  						   OR EXISTS (SELECT 1 FROM ems_employee_resignations ers WHERE ers.empid = e.id AND v_date <= DATE(ers.actual_relieving_date) and ers.status in('Approved') )
  						   OR EXISTS (SELECT 1 FROM ems_employee_terminations et WHERE et.empid = e.id AND v_date <= DATE(et.termination_date) and et.status in('Approved','Submitted') ) ) end
                          );
          
         DROP TEMPORARY TABLE IF EXISTS tmpLocations;
 	else      -- all locations
    	select e.id as manager_emp_id,(select get_employee_name(e.id)) as manager_name ,s.name as mgr_status from employee e left join statusmaster s on s.id = e.status
			where e.id in (select s.reportingmanagerid from employee_reportingmanagers s where s.empid in (select ew.empid from employee_worklocations ew where  
			v_date between ew.effectivefromdate and ifnull(ew.effectivetodate,v_today)) ) 
			 and e.id in (select distinct er.reportingmanagerid from employee_reportingmanagers er where v_date between er.effectivestartdate and  ifnull(er.effectiveenddate,v_today))
			 and e.id in(select ers.employee_id from employee_roles ers where ers.role_id in (12,13,14) and v_date between ers.effective_from_date and ifnull(ers.effective_to_date,v_today))
               AND (DATE(e.dateofjoin) <= v_date OR MONTH(e.dateofjoin) = MONTH(v_date))
  						AND (case when v_active_only = 0 then 1=1 else  (e.status = 1 
  						   OR EXISTS (SELECT 1 FROM ems_employee_resignations ers WHERE ers.empid = e.id AND v_date <= DATE(ers.actual_relieving_date) and ers.status in('Approved') )
  						   OR EXISTS (SELECT 1 FROM ems_employee_terminations et WHERE et.empid = e.id AND v_date <= DATE(et.termination_date) and et.status in('Approved','Submitted') ) ) end
                          );
	end if;
    
 end$$
 DELIMITER ;

 -- -----------------------------------------------------------------------------------------

