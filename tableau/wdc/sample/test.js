(function() {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function(schemaCallback) {
    var cols = [{
      id: 'State',
      dataType: tableau.dataTypeEnum.string
    }, {
      id: 'Sales',
      dataType: tableau.dataTypeEnum.float
    }, {
      id: 'Discount',
      dataType: tableau.dataTypeEnum.float
    }];
    var tableSchema = {
      id: 'earthquakeFeed',
      alias: 'WDC Sample',
      columns: cols
    };
    schemaCallback([tableSchema]);
  };

  var toJson = function(csvData) {
    var lines = csvData.replace('\r\n', '\n').replace('\r', '\n').split('\n');
    var colNames = lines[0].split(',');
    var records=[];
    for(var i = 1; i < lines.length; i++) {
      var record = {};
      var bits = lines[i].split(',');
      for (var j = 0 ; j < bits.length ; j++) {
        record[colNames[j]] = bits[j];
      }
      records.push(record);
    }
    return records;
  };

  myConnector.getData = function(table, doneCallback) {
    var tableData = [];
    $.ajax({
      'url' : 'https://taiga.github.io/tableau/wdc/sample/superstore.csv'
    })
    .done(function (result) {
      var records = toJson(result);
      $.each(records, function(i, q) {
        var row = records[i];
        tableData.push({
          'State': row.State,
          'Sales': row.Sales,
          'Discount': row.Discount
        });
      });
      table.appendRows(tableData); //NOTE:テーブルデータ付与
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);
  $(document).ready(function() {
    $('#submitButton').click(function() {
      tableau.connectionName = 'WDC Sample';
      tableau.submit();
    });
  });
})();
