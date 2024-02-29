$(document).ready(function() {
    var table = $('#sampleTable').DataTable({});
    $.ajax({
        url: '/storages/data',  // Verilerin alındığı endpoint
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Verileri tabloya ekle
            for (var i = 0; i < data.length; i++) {
                table.row.add([
                    data[i].storagename,
                    data[i].storagecode,
                    data[i].storagecity,
                    data[i].storageprovince,
                    data[i].storageaddress,
                    data[i].products_storage_name,
                    data[i].products_storage_productcode,
                    data[i].products_storage_amount
                ]).draw();
            }
        },
        error: function(error) {
            console.error('Veri alınamadı:', error);
        }
    });
});