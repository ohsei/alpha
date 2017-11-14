import {
  dbName,
  tblName,
  GET_ALL_FILE,
  GET_ONE_FILE,
  SAVE_ONE_FILE,
  DEL_ONE_FILE,
} from './const.js'

let fileList = []

export const dbOperate = (pattern, operateJson) => {
  const openReq = indexedDB.open(dbName)

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
    case GET_ALL_FILE: {
      fileList = []
      req = store.openCursor()
      break
    }

    case SAVE_ONE_FILE: {
      const fileObj = operateJson.fileObj
      req = store.put(
        {
          filename: fileObj.filename,
          data: fileObj.data,
          createtime: new Date()
        }
      )
      break
    }

    case GET_ONE_FILE: {
      const filename = operateJson.filename
      req = store.get(filename)
      break
    }

    case DEL_ONE_FILE: {
      const filename = operateJson.filename
      req = store.delete(filename)
      break
    }
    }

    req.onsuccess = function (event){

      if (pattern == GET_ALL_FILE){
        var cursor = event.target.result

        if (cursor){
          fileList.push(cursor.value.filename)
          cursor.continue()
        }
      }

      if (pattern == GET_ONE_FILE){
        operateJson.callback(event.target.result)
      }

      if (pattern == SAVE_ONE_FILE){
        operateJson.callback()
      }

    }

    trans.oncomplete = () => {
      if (pattern == GET_ALL_FILE){
        operateJson.callback()
      }

      if (pattern == DEL_ONE_FILE){
        operateJson.callback()
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