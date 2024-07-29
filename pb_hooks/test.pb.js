onAfterBootstrap((e) => {
  console.log("Your pocketbase instance is up and running");
});

onRecordAfterCreateRequest(function (e) {
  var facetValues = e.record.expandAll("facet_values");

  if (facetValues != null) {
    // Iterate over each facet value and create a new record in the product_variants collection
    for (var i = 0; i < array.length; i++) {
      var id = array[i];
      try {
        var collection = $app
          .dao()
          .findCollectionByNameOrId("product_variants");

        var record = new Record(collection, {
          product: e.record.id,
          stock_count: 1,
          facet_value: id,
        });

        $app.dao().saveRecord(record);
      } catch (error) {
        console.error(
          "Error creating product_variant for facet value " + id + ":",
          error
        );
      }
    }
  }
}, "products");
