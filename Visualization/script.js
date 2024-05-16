$(document).ready(function() {
    const subject ={
        classID: 'IT1110E',
        intervalTime: 3,
        schoolYear:'20221'
    }
    const commentDetail={
        total:10,
        average:10,
        median:10,
        maximumPoint:10,
        minimumPoint:10,
        mostStudentGain:10,
        totalFailPoint:10,
        failPointRate:10,
        totalexcellentPoint:10,
        excellentPointRate:10
    }

    const commentEpilogue ="Phổ điểm gần tuân theo phân phối chuẩn và có vẻ như đây là đề thi tốt và không có dấu hiệu bị phân hoá.";

    $("#total").text(commentDetail.total);
    $("#average").text(commentDetail.average);
    $("#median").text(commentDetail.median);
    $("#maximum-point").text(commentDetail.maximumPoint);
    $("#minimum-point").text(commentDetail.minimumPoint);
    $("#most-student-gain").text(commentDetail.mostStudentGain);
    $("#total-fail-point").text(commentDetail.totalFailPoint);
    $("#fail-point-rate").text(commentDetail.failPointRate);
    $("#total-excellent-point").text(commentDetail.totalexcellentPoint);
    $("#excellent-point-rate").text(commentDetail.excellentPointRate);
    $("#chart-comments-epilogue").text(commentEpilogue);
    $(".class-id").text(subject.classID);
    $(".test-interval").text(subject.intervalTime);
    $(".school-year").text(subject.schoolYear);

    var chart = new CanvasJS.Chart("visualization-main", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Top Oil Reserves"
        },
        axisY: {
            title: "Reserves(MMbbl)"
        },
        data: [{        
            type: "column",  
            showInLegend: true, 
            legendMarkerColor: "grey",
            legendText: "MMbbl = one million barrels",
            dataPoints: [      
                { y: 300878, label: "Venezuela" },
                { y: 266455,  label: "Saudi" },
                { y: 169709,  label: "Canada" },
                { y: 158400,  label: "Iran" },
                { y: 142503,  label: "Iraq" },
                { y: 101500, label: "Kuwait" },
                { y: 97800,  label: "UAE" },
                { y: 80000,  label: "Russia" }
            ]
        }]
    });
    chart.render();
})