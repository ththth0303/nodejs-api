const db = require("../api/config/database");
const sleep = require("system-sleep");
const table = "users";

const axios = require("axios");
console.time("dbsave");
const count = 5000;
function makeRequest(type, member_id, offset_card_id) {
  return new Promise(function(resolve, reject) {
    let data = {
      jsonrpc: "2.0",
      method: "Unipos.GetCards2",
      params: {
        offset_card_id,
        count
      },
      id: "Unipos.GetCards2"
    };
    switch (type) {
      case "clapped":
        data.params.praised_member_id = member_id;
        break;

      case "received":
        data.params.from_member_id = member_id;
        break;

      case "sent":
      default:
        data.params.to_member_id = member_id;
        break;
    }

    axios({
      url: "https://unipos.me/q/jsonrpc",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-unipos-token": "6d14d567-39b3-4ae9-b957-f28db9828ebf"
      },
      data
    })
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        // console.log(error);

        reject(error);
      });
  });
}

async function getReceived(type, member_id) {
  let sent = { point: 0, clap: 0, time: 0 };
  let offset_card_id = "";
  while (true) {
    try {
        let result = await makeRequest(type, member_id, offset_card_id);
        offset_card_id = result.length > 0 && result[result.length - 1].id;
        for (const key in result) {
          sent.point += result[key].point;
          sent.clap += result[key].praise_count;
          sent.time++;
        }
        if (result.length < count) {
          return sent;
        }
        
    } catch (error) {
        console.log('getReceived', type, member_id);
        
        throw "getReceived"; 
    }
  }
}

async function getPoint(member_id) {
    let sent = getReceived("send", member_id);
    let received = getReceived("received", member_id);
    let clapped = getReceived("clapped", member_id);

    let sumReceive = 0;
    let sumSent = 0;
    try {
        let value = await Promise.all([sent, received, clapped]);
    
        sumReceive = value[0].point + value[0].clap + value[1].clap;
        sumSent = value[1].point + value[2].clap * 2;
        return [sumReceive, sumSent];
    } catch (error) {
        throw "getPoint";        
    }
}


// async function get() {
//     let a = await getPoint("42f117dd-0b92-4b92-b61a-b31dba62797a");
//     console.log(a);
// };

// get();

async function storeUser(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        await store(element, index);
        
    }
}

async function store(element, index) {
    let sql = `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`;
    let time = 0;
    try {
        let [point_received, point_sent] = await getPoint(element.id);
        let user = {
            "user_id": element.id,
            "display_name": element.display_name,
            "uname": element.uname,
            "picture_url": element.picture_url,
            "point_sent": point_sent,
            "point_received": point_received,
        }

        db.query(sql, [user, user], (err, response) => {
            if (err) throw err;
            console.log(index, user.display_name, user.point_received);
        });
        
    } catch (error) {
        console.log(error);
        
        time++;
        console.log("errr:", time,  element.display_name);
        console.log('sleeping ...');
        sleep(10000);
        
        if (time < 4) {
            store(element, index);
        }
        
    }
}

// storeUser();

function getAllUser() {
    let data = {
      jsonrpc: "2.0",
      method: "Unipos.FindSuggestMembers",
      params: {},
      id: "Unipos.GetCards2"
    };

    axios({
      url: "https://unipos.me/q/jsonrpc",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-unipos-token": "6d14d567-39b3-4ae9-b957-f28db9828ebf"
      },
      data
    })
      .then(response => {
        console.log(response.data.result.length);
        storeUser(response.data.result);
        console.timeEnd("dbsave");
      })
      .catch(error => {
        console.log(error);

        reject(error);
      });
}

getAllUser();

// for (y = 0; y < 10; y++) {
//   console.log(y);
//   sleep(1000);
// }



