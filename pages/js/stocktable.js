$(document).ready(function() {
    var table = $('#sampleTable').DataTable({});
    $.ajax({
        url: '/stock/data',  // Verilerin alındığı endpoint
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Verileri tabloya ekle
            for (var i = 0; i < data.length; i++) {
                table.row.add([
                    data[i].name,
                    data[i].productcode,
                    data[i].amount,
                    data[i].marketname,
                    data[i].marketcode,
                    data[i].products_market_amount,
                    data[i].storagename,
                    data[i].storagecode,
                    data[i].products_storage_amount,
                ]).draw();
            }
        },
        error: function(error) {
            console.error('Veri alınamadı:', error);
        }
    });
});