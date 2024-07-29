onAfterBootstrap((e) => {
  console.log("Your pocketbase instance is up and running");
});

onRecordAfterCreateRequest(function (e) {
  var facetValues = e.record.get("facet_values");

  if (facetValues != null) {
    // Ensure facetValues is an array
    var array = Array.isArray(facetValues) ? facetValues : [facetValues];

    // Array to hold the IDs of the created records
    var createdRecords = [];

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
          price: record.getInt("price"),
        });

        $app.dao().saveRecord(record);
        createdRecords.push(record.id); // Store the ID of the created record
      } catch (error) {
        console.error(
          "Error creating product_variant for facet value " + id + ":",
          error
        );
      }
    }

    // Update the original record's variants column with the created records
    e.record.set("variants", createdRecords);
    $app.dao().saveRecord(e.record);
  }
}, "products");
