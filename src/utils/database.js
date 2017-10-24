const dbName = 'fileSaveDB'
const tblName = 'fileList'
let fileList = []

export const InitDB = (callback) => {
  const openReq = indexedDB.open(dbName, 1)

  openReq.onupgradeneeded = () => {
    console.log('initdb')
    var db = openReq.result
    db.createObjectStore(tblName, {keyPath: 'filename'})
  }

  openReq.onsuccess = (event) => {
    var db = event.target.result
    db.close()
  }

  openReq.onblocked = () => {
    console.log ('open blocked')
  }
}

export const setItem = (fileObj) => {
  const openReq = indexedDB.open(dbName)

  openReq.onsuccess = () => {
    var db = openReq.result
    var trans = db.transaction(tblName, 'readwrite')
    var store = trans.objectStore(tblName)

    var putQuery = store.put({filename: fileObj.filename, data: fileObj.data, createtime: new Date()})

    putQuery.onsuccess = () => {
      console.log('put data success')
    }

    trans.oncomplete = function (){
      // トランザクション完了時(putReq.onsuccessの後)に実行
      console.log('transaction complete')
      db.close()
    }
  }
}

export const dbOperate = (pattern, callback, fileObj, filename, getCallback, overWriteCallback, deleteCallback) => {
  const openReq = indexedDB.open(dbName)
  fileList = []

  openReq.onblocked = () => {
    console.log ('open blocked')
  }

  openReq.onupgradeneeded = () => {
    console.log('initdb')
    var db = openReq.result
    db.createObjectStore(tblName, {keyPath: 'filename'})
  }

  openReq.onerror = () => {
    console.log('onerror')
  }

  openReq.onsuccess = () => {
    var db = openReq.result
    var trans = db.transaction(tblName, 'readwrite')
    var store = trans.objectStore(tblName)
    var req = null

    switch (pattern) {
    case 0: {
      req = store.openCursor()
      break
    }

    case 1: {
      req = store.put({filename: fileObj.filename, data: fileObj.data, createtime: new Date()})
      break
    }

    case 3: {
      req = store.get(filename)
      break
    }

    case 4: {
      req = store.get(filename)
      break
    }

    case 5: {
      req = store.delete(filename)
      break
    }
    }

    var i = 0

    req.onsuccess = function (event){

      if (pattern == 0){
        var cursor = event.target.result

        if (cursor){
          fileList.push(cursor.value.filename)
          i++
          cursor.continue()
        }
      }

      if (pattern == 3){
        getCallback(event.target.result)
      }

      if (pattern == 4){
        overWriteCallback(event.target.result)
      }

    }

    trans.oncomplete = () => {
      if (pattern == 0){
        callback()
      }

      if (pattern == 5){
        deleteCallback()
      }
      db.close()
    }

    req.onblocked = () => {
      console.log ('get blocked')
    }
  }
}

export const getFileList = () => {
  return fileList
}