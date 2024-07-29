onAfterBootstrap((e) => {
  console.log(e.app);
});

onRecordAfterCreateRequest((e) => {
  console.log(e.httpContext);
  console.log(e.record);
  console.log(e.uploadedFiles);
});
