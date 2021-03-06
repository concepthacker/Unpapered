function uploader(storageInfo, token, user) {
  console.log(token)
  var client = remoteStorage.createClient(storageInfo, "unpapered", token)

  var value = readability.init()

  client.get("index", function(error, data) {
    if(error) {
      console.log("got an error: "+error)
    } else {
      console.log(data)

      var index
      if(typeof data === "undefined")
        index = Array()
      else
        index = JSON.parse(data)

      index.push(value.title.replace(/<(?:.|\n)*?>/gm, ''))
      client.put("index", JSON.stringify(index), function(error) {
        if(error)
          console.log(error)
        else {
          console.log("index updated")
          var content = JSON.stringify(value)
          var key = value.title.replace(/<(?:.|\n)*?>/gm, '')
          client.put(key, content, function(error) {
            if(error)
              console.log(error)
            else
              console.log("content uploaded")
          })
        }
      })
    }
  });

}

