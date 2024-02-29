$(document).ready(function() {
    var table = $('#sampleTable').DataTable({});
    $.ajax({
        url: '/main/data',  // Verilerin alındığı endpoint
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Verileri tabloya ekle
            for (var i = 0; i < data.length; i++) {
                table.row.add([
                    data[i].name,
                    data[i].productcode,
                    '<img src="' + data[i].imagepath + '" alt="Product Image" style="max-width: 100px; max-height: 100px;">',
                    data[i].brand,
                    data[i].barcode,
                    data[i].price + ' TL',
                    data[i].kdvratio,
                    data[i].amount,
                    data[i].category,
                    data[i].subcategory,
                ]).draw();
            }
        },
        error: function(error) {
            console.error('Veri alınamadı:', error);
        }
    });
});