const dbName = 'fileSaveDB'
const tblName = 'fileList'

export const InitDB = () => {
  const openReq = indexedDB.open(dbName, 1)

  openReq.onupgradeneeded = () => {
    var db = openReq.result
    db.createObjectStore(tblName, {keyPath: 'id', autoIncrement: true})
  }
}

export const setItem = (fileObj) => {
  const openReq = indexedDB.open(dbName, 1)

  openReq.onsuccess = () => {
    var db = openReq.result
    var trans = db.transaction(tblName, 'readwrite')
    var store = trans.objectStore(tblName)
  
    var putQuery = store.put({id: fileObj.id, filename: fileObj.filename, data: fileObj.data, createtime: new Date()})

    putQuery.onsuccess = () => {
      console.log('put data success')
    }

    trans.oncomplete = function(){
      // トランザクション完了時(putReq.onsuccessの後)に実行
      console.log('transaction complete');
    }
  }
}

export const getAllItems = () => {
  const openReq = indexedDB.open(dbName, 1)
  let fileList = []
  openReq.onsuccess = () => {
    var db = openReq.result
    var trans = db.transaction(tblName, 'readonly')
    var store = trans.objectStore(tblName)
    var getReq = store.openCursor();
    var count = 0
    getReq.onsuccess = function(event){

      var cursor = event.target.result
      
      if (cursor){
        fileList.push(cursor.value)
        cursor.continue()
      }
    }
    return fileList
  }

  openReq.onerror = (e) => {
    console.log(e.error)
  }
}