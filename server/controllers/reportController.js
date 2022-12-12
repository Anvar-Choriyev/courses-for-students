const Subjects = require("../models/Subjects")
const catchAsync = require("../utils/catchAsync")
const excelJS = require("exceljs")

exports.exportSubjects = catchAsync(async (req, res, next) => {
	const workbook = new excelJS.Workbook();
	const worksheet = workbook.addWorksheet("subjects");
	worksheet.columns = [
		{ header: "No", key: "s_no", width: 5 },
		{ header: "Id", key: "id", width: 20 },
		{ header: "Nomi", key: "name", width: 15 },
		{ header: "Ma'ruza", key: "lecture", width: 20 },
		{ header: "Sillabus", key: "syllabus", width: 15 },
		{ header: "Adabiyotlar", key: "literature", width: 20 },
    ]
    let downloadSubjects = await Subjects.findAndCountAll();
    const subjectsArr = Object.values(downloadSubjects.rows.map((e) => e));
	let counter = 1;
	subjectsArr.forEach((subject) => {
		subject.s_no = counter;
		worksheet.addRow(subject);
		counter++;
	});
    worksheet.eachRow((row) => {
		row.eachCell((cell) => {
		cell.border = {
			top: { style: "thin" },
			left: { style: "thin" },
			bottom: { style: "thin" },
			right: { style: "thin" },
		}
	    cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true
      	}
    })
    })
    worksheet.getRow(1).eachCell((cell) => {
		(cell.font = { bold: true }),
			(cell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "ffd385" },
			})
	})
    res.setHeader(
		"Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	);
	res.setHeader("Content-Disposition", "attachment; filename=subjects.xlsx");
	return workbook.xlsx.write(res).then(() => {
		res.status(200).end();
	})
})