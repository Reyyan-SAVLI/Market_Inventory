$(document).ready(function() {
    var table = $('#sampleTable').DataTable({});
    $.ajax({
        url: '/markets/data',  // Verilerin alındığı endpoint
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Verileri tabloya ekle
            for (var i = 0; i < data.length; i++) {
                table.row.add([
                    data[i].marketname,
                    data[i].marketcode,
                    data[i].marketcity,
                    data[i].marketprovince,
                    data[i].marketaddress,
                    data[i].products_market_name,
                    data[i].products_market_productcode,
                    data[i].products_market_amount,
                ]).draw();
            }
        },
        error: function(error) {
            console.error('Veri alınamadı:', error);
        }
    });

});