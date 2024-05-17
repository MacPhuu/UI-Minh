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
    var data_analyzed ={
        code_subject_value: 'IT1110E',
        shift_exam_value: 1,
        semester_value: '20222',
        total_score: 173,
        total_scores_above_eight: 8,
        total_scores_below_four: 84,
        max_score: 9.0,
        max_score_frequency: 3,
        min_score: 0.0,
        min_score_frequency: 17,
        highest_appearances: 21,
        score_highest_appearances: [5.0, 1.0, 1.5, 5.0, 7.0],
        score_abnormal_appearances: [1.0, 1.5, 5.0, 7.0],
        number_unfinished_exam: 17,
        mean_appearances: 9.0,
        mean_score: 4.2,
        median_score: 4.75,
        phan_hoa: 1,
        list_score: [0.0, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 7.5, 8.0, 8.5, 9.0],
        list_appearances: [17, 2, 1, 4, 10, 18, 15, 17, 16, 21, 18, 8, 7, 9, 2, 4, 1],
        count_appearances_right: 73,
        count_appearances_left: 100,
        shift_direction: 'left',
    };
    const commentEpilogue ="Phổ điểm gần tuân theo phân phối chuẩn và có vẻ như đây là đề thi tốt và không có dấu hiệu bị phân hoá.";

    
    var data_point_column = [];
    var data_point_spline = [];

    for (var i = 0; i < data_analyzed.list_score.length; i++) {
        let add_data = {}
        if (data_analyzed.list_appearances[i] == data_analyzed.highest_appearances) {
            add_data = {
                x: data_analyzed.list_score[i],
                y: data_analyzed.list_appearances[i], 
                indexLabel: 'Highest Appearances'
            }
        }
        else {
            add_data = {
                x: data_analyzed.list_score[i],
                y: data_analyzed.list_appearances[i]
            }
        } 
        
        data_point_column.push(add_data);
        data_point_spline.push({
            x: data_analyzed.list_score[i],
            y: data_analyzed.list_appearances[i]
        })
    }
    console.log(data_point_column);
    var title_text = "Phổ điểm thi của lớp " + data_analyzed.code_subject_value
    var below_four_rate = (data_analyzed.total_scores_below_four * 100 / data_analyzed.total_score ).toFixed(2)
    var above_eight_rate = (data_analyzed.total_scores_above_eight * 100 / data_analyzed.total_score).toFixed(2)
    var unfinished_rate = (data_analyzed.number_unfinished_exam * 100 / data_analyzed.total_score).toFixed(2)

    $("#total_score").text(data_analyzed.total_score);
    $("#mean_score").text(data_analyzed.mean_score);
    $("#median_score").text(data_analyzed.median_score);
    $("#max_score").text(data_analyzed.max_score);
    $("#min_score").text(data_analyzed.min_score);
    $("#score_highest_appearances").text(data_analyzed.score_highest_appearances[0]);
    $("#total_scores_below_four").text(data_analyzed.total_scores_below_four);
    $("#below_four_rate").text(below_four_rate);
    $("#total_scores_above_eight").text(data_analyzed.total_scores_above_eight);
    $("#above_eight_rate").text(above_eight_rate);
    $("#number_unfinished_exam").text(data_analyzed.number_unfinished_exam);
    $("#unfinished_rate").text(unfinished_rate);
    $("#chart_comments_conclusion").text(commentEpilogue);
    $(".subject_id").text(data_analyzed.code_subject_value);
    $(".shift_exam").text(data_analyzed.shift_exam_value);
    $(".semester").text(data_analyzed.semester_value);
    
    
    // Bảng tần số
    
    const bodyRows = document.getElementById('bodyRows');
    const scoreRow = document.createElement('tr');
    const scoreHeaderCell = document.createElement('th');
    scoreHeaderCell.textContent = 'Điểm';
    scoreRow.appendChild(scoreHeaderCell);

    data_analyzed.list_score.forEach(score => {
        const cell = document.createElement('td');
        cell.textContent = score;
        scoreRow.appendChild(cell);
    });
    const appearanceRow = document.createElement('tr');
    const appearanceHeaderCell = document.createElement('th');
    appearanceHeaderCell.textContent = 'Số lần xuất hiện';
    appearanceRow.appendChild(appearanceHeaderCell);

    data_analyzed.list_appearances.forEach(appearance => {
        const cell = document.createElement('td');
        cell.textContent = appearance;
        appearanceRow.appendChild(cell);
    });
    bodyRows.appendChild(scoreRow);
    bodyRows.appendChild(appearanceRow);

    // Bảng thông tin chi tiết
    const formatted_list_highest_appearances = data_analyzed.score_highest_appearances.join(" , ")
    const data_table_detail = [
      { stat: "Tổng số thí sinh", value: data_analyzed.total_score, percentage: "-" },
      { stat: "Điểm trung bình", value: data_analyzed.mean_score, percentage: "-" },
      { stat: "Trung vị", value: data_analyzed.median_score, percentage: "-" },
      { stat: "Mốc điểm trung bình có nhiều thí sinh đạt được nhất", value: formatted_list_highest_appearances, percentage: "-" },
      { stat: "Số thí sinh đạt điểm kém (<4)", value: data_analyzed.total_scores_below_four, percentage: below_four_rate },
      { stat: "Số thí sinh đạt điểm tốt (>8)", value: data_analyzed.total_scores_above_eight, percentage: above_eight_rate },
      { stat: "Số thí sinh bỏ thi hoặc chưa làm", value: data_analyzed.number_unfinished_exam, percentage: unfinished_rate },
    
    ];

    const tbody = document.querySelector("#detailTable tbody");

    data_table_detail.forEach(item => {
        const row = document.createElement("tr");

        const statCell = document.createElement("td");
        statCell.textContent = item.stat;
        row.appendChild(statCell);

        const valueCell = document.createElement("td");
        valueCell.textContent = item.value;
        row.appendChild(valueCell);

        const percentageCell = document.createElement("td");
        percentageCell.textContent = item.percentage;
        row.appendChild(percentageCell);

        tbody.appendChild(row);
    });

    
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: ''
    
      },   
      data: [{        
        type: "column",
        dataPoints: data_point_column
      },
      {        
        type: "spline",
        dataPoints: data_point_spline
      }
      ]
    });
    chart.render();

    number_score_between_4_8 = data_analyzed.total_score - data_analyzed.total_scores_below_four - data_analyzed.total_scores_above_eight;
    var chart1 = new CanvasJS.Chart("chartDoughnut",
    {
      title:{
        text: ''
      },
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
      {
       type: "pie",
       showInLegend: true,
			 legendText: "{indexLabel}",
       dataPoints: [
       {  y: data_analyzed.total_scores_below_four, indexLabel: "Số sinh viên có điểm thi kém" },
       {  y: number_score_between_4_8, indexLabel: "Số thi sinh có điểm thi khá" },
       {  y: data_analyzed.total_scores_above_eight, indexLabel: "Số thi sinh có điểm thi tốt" },
       ]
     }
     ]
    });
   chart1.render();

    $.ajax({
        type: 'GET',
          dataType:"jsonp",
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        headers:{         
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBWZXIiOiIwLjAuMCIsImV4cCI6NDcyNjM4OTEyMiwibG9jYWxlIjoiIiwibWFzdGVyVmVyIjoiIiwicGxhdGZvcm0iOiIiLCJwbGF0Zm9ybVZlciI6IiIsInVzZXJJZCI6IiJ9.QIZbmB5_9Xlap_gDhjETfMI6EAmR15yBtIQkWFWJkrg',
            
        },
        success: function (data, status, xhr) {
          console.log('data: ', data);
        }
      });
})