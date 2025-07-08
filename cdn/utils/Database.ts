import fs from "fs";
export class Database {

    jsonFilePath: string
    data: {}
   
    constructor(filePath){

        this.jsonFilePath = filePath || "./database.json";
    
        this.data = {};
        
        if(!fs.existsSync(this.jsonFilePath)){
            fs.writeFileSync(this.jsonFilePath,'{}', "utf-8");
            console.log(this.jsonFilePath + " Bulunamadı.. Yenisi Oluşturuldu");
        }else {
            this.fetchDataFromFile();
        }
    
    }

    
    fetchDataFromFile(){
        const savedData = JSON.parse(fs.readFileSync(this.jsonFilePath));
        if(typeof savedData === "object"){
            this.data = savedData;
        }
    }

   
    saveDataToFile(){
        fs.writeFileSync(this.jsonFilePath, JSON.stringify(this.data, null, 2), "utf-8");
    }

  
    get(key){
        return this.data[key];
    }

   fetch(key){
        return this.data[key];
    }

    has(key){
        if(!key) return Error("Key")
        return Boolean(this.data[key]);
    }
    

    set(key, value){
        this.data[key] = value;
        this.saveDataToFile();
    }

   
    delete(key){
        delete this.data[key];
        this.saveDataToFile();
    }


    add(key, count){
        if(!this.data[key]) this.data[key] = 0;
        this.data[key] += count;
        this.saveDataToFile();
    }


    sub(key, count){
        if(!this.data[key]) this.data[key] = 0;
        this.data[key] -= count;
        this.saveDataToFile();
    }

 
    push(key, element){
        if (!this.data[key]) this.data[key] = [];
        this.data[key].push(element);
        this.saveDataToFile();
    }

    pull(key, element){
        if(!key) return;
        if(!element) return;
        const arr = this.data[key]
    
        for( var i = 0; i < arr.length; i++){ 
        if ( arr[i] === element) { 
            arr.splice(i, 1); 
        }
    }
    this.saveDataToFile();

    }
    console(key){
        console.log(key)
    }
};
