package com.ng2sb.utils;

import com.ng2sb.config.ExcelConfig;
import com.ng2sb.models.Employee;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public class ExcelCommonUtil {

    private Workbook workbook;
    private Map<String, Object> model;
    private HttpServletResponse response;

    public ExcelCommonUtil(Workbook workbook, Map<String, Object> model, HttpServletResponse response) {
        this.workbook = workbook;
        this.model = model;
        this.response = response;
    }

    public void createExcel() {
        setFileName(response, mapToFileName());

        Sheet sheet = workbook.createSheet();

        createHead(sheet, mapToHeadList());

        createBody(sheet, mapToBodyList());
    }

    private String mapToFileName() {
        return (String) model.get(ExcelConfig.FILE_NAME);
    }

    private List<String> mapToHeadList() {
        return (List<String>) model.get(ExcelConfig.HEAD);
    }

    private List<Employee> mapToBodyList() {
        return (List<Employee>) model.get(ExcelConfig.BODY);
    }

    private void setFileName(HttpServletResponse response, String fileName) {
        response.setHeader("Content-Disposition",
                            "attachment; filename=\"" + setFileExtension(fileName) + "\"");
    }

    private String setFileExtension(String fileName) {
        if ( workbook instanceof XSSFWorkbook) {
            fileName += ".xlsx";
        }
        if ( workbook instanceof SXSSFWorkbook) {
            fileName += ".xlsx";
        }
        if ( workbook instanceof HSSFWorkbook) {
            fileName += ".xls";
        }

        return fileName;
    }

    private void createHead(Sheet sheet, List<String> headList) {
        createRow(sheet, headList, 0);
    }

    private void createBody(Sheet sheet, List<Employee> employees) {
        int rowCount = 1;
        for(Employee employee : employees){
            Row row = sheet.createRow(rowCount++);
            row.createCell(0).setCellValue(employee.getEmployeeId());
            row.createCell(1).setCellValue(employee.getEmployeeName());
            row.createCell(2).setCellValue(employee.getDesignation());
            row.createCell(3).setCellValue(employee.getDepartment());
            row.createCell(4).setCellValue(employee.getDob());
            row.createCell(5).setCellValue(employee.getStartDate());
            row.createCell(6).setCellValue(employee.getManager());
        }
    }

    private void createRow(Sheet sheet, List<String> cellList, int rowNum) {
        int size = cellList.size();
        Row row = sheet.createRow(rowNum);

        for (int i = 0; i < size; i++) {
            row.createCell(i)
                .setCellValue(cellList.get(i));
        }
    }
}