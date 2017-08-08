package com.ng2sb.controllers;

import java.util.List;
import java.util.Date;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import com.ng2sb.models.Employee;
import com.ng2sb.repositories.EmployeeRepository;
import com.ng2sb.config.ExcelConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmpController {

    @Autowired
    EmployeeRepository empRepository;

    // Get all employees from employee db
    @GetMapping("/emp-list")
    public List<Employee> getAllEmployees() {
        Sort sortByEmpName = new Sort(Sort.Direction.ASC, "employeeName");
        return empRepository.findAll(sortByEmpName);
    }

    // Create new employee
    @PostMapping("/new-emp")
    public Employee createEmployee(@Valid @RequestBody Employee emp) {
        return empRepository.save(emp);
    }

    // Get employee by Id
    @GetMapping(value="/emp-details/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") String id) {
        Employee emp = empRepository.findOne(id);
        if(emp == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(emp, HttpStatus.OK);
        }
    }

    // Update employee
    @PutMapping(value="/emp-details/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") String id,
                                           @Valid @RequestBody Employee emp) {
        Employee empData = empRepository.findOne(id);
        if(empData == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        empData.setEmployeeId(emp.getEmployeeId());
        empData.setEmployeeName(emp.getEmployeeName());
        empData.setDesignation(emp.getDesignation());
        empData.setDepartment(emp.getDepartment());
        empData.setManager(emp.getManager());

        Date dob = emp.getDob();
        Date sd = emp.getStartDate();
        Date ed = emp.getEndDate();

        if(dob != null){
            empData.setDob(dob);
        }
        if(sd != null){
            empData.setStartDate(sd);
        }
        if(ed != null){
            empData.setEndDate(ed);
        }

        Employee updatedEmployee = empRepository.save(empData);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    // Delete employee
    @DeleteMapping(value="/emp-details/{id}")
    public void deleteEmployee(@PathVariable("id") String id) {
        empRepository.delete(id);
    }

    // Mapping Excel for export and import
    @GetMapping("excel-xls")
    public ModelAndView xlsView() {
        return new ModelAndView("excelXlsView", getDefaultMap());
    }

    @GetMapping("excel-xlsx")
    public ModelAndView xlsxView() {
        return new ModelAndView("excelXlsxView", getDefaultMap());
    }

   /* @GetMapping("excel-xlsx-streaming")
    public ModelAndView xlsxStreamingView() {
        return new ModelAndView("excelXlsxStreamingView", getDefaultMap());
    }*/

    //Generating Map to store employee records to export
    private Map<String, Object> getDefaultMap() {
        Map<String, Object> map = new HashMap<>();
        map.put(ExcelConfig.FILE_NAME, "Employee-Details");
        map.put(ExcelConfig.HEAD,Arrays.asList("Employee Name", "Employee ID", "Designation","Department","Date Of Birth","Start Date","Manager"));
        map.put(ExcelConfig.BODY,empRepository.findAll(new Sort(Sort.Direction.ASC, "employeeName")));
                
        return map;
    }
}
