onAfterBootstrap((e) => {
  console.log(JSON.stringify(e.app));
});

onRecordAfterCreateRequest((e) => {
  console.log(JSON.stringify(e.httpContext));
  console.log(JSON.stringify(e.record));
  console.log(JSON.stringify(e.uploadedFiles));
});
