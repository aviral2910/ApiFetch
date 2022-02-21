import "node-fetch";
import fetch from "node-fetch";

async function addMessage() {
  const contractAddress = "0x3b417faee9d2ff636701100891dc2755b5321cc3";
  var url = `https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=eth&format=decimal`;
  const params = {
    headers: {
      "x-api-key":
        "E8KUUv2L8gY2DMTSimYzBPkWzhSBuASBygmSN1Qr7BK8YqDCYJ3RlVzvBGIuFZGW",
      accept: "application/json",
    },
  };
  var List = ['Empty'];
  const FinalData = await fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (var key in data["result"]) {
        const token_uri = data["result"][key]["token_uri"];
        if (token_uri != null) {
          fetch(token_uri)
            .then((resIn) => {
              if (!resIn.ok) {
                throw new Error("Some Network Error Occured");
              }
              return resIn.json();
            })
            .then((dataIn) => {
              if (dataIn.name != null && dataIn.image != null){
               List.push(dataIn.name);
           //   console.log(List.at(1))
              }
            })
            .catch((error) => {
            });
        }
      }
      
    })
    // .then((listdata) => {
    //   console.log(listdata);
    // })
    // ;
console.log(FinalData);
}

addMessage();



// import https from "https";

// var options = {
//   host: "deep-index.moralis.io",
//   path: "/api/v2/0x293ed38530005620e4b28600f196a97e1125daac/nft?chain=eth&format=decimal",
//   method: "GET",
//   headers: {
//     "X-API-Key":
//       "E8KUUv2L8gY2DMTSimYzBPkWzhSBuASBygmSN1Qr7BK8YqDCYJ3RlVzvBGIuFZGW",
//   },
// };

// async function getRequest() {
//   const datalist1 = await request();
//   console.log("this is datalist" + datalist1 + " end of datalist");
// }
// getRequest();

// function request() {
//   return new Promise((resolve,reject) => {
//     var datalist = [];
//     https.get(options, (res) => {
//       if (res.statusCode !== 200) {
//         console.error(
//           `Did not get an OK from the server. Code: ${res.statusCode}`
//         );
//         res.resume();
//         return;
//       }
//       let data = "";
//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("close", () => {
//         console.log("Retrieved all data");
//         // console.log(JSON.parse(data));
//         data = JSON.parse(data);
//         let url = "";
//         for (let step = 0; step < 4; step++) {
//           // console.log(data["result"][step]["token_uri"]);
//           //Checking if token_uri is null or not
//           if (data["result"][step]["token_uri"] != null) {
//             // console.log("uri is present");
//             url = data["result"][step]["token_uri"];
//           } else {
//             url = "Not Available";
//           }

//           //Checking if token_uri contains http
//           if (url.startsWith("https")) {
//             // console.log("this is "+url);
//             try {
//               https
//                 .get(encodeURI(url), (resp) => {
//                   let nftdata = "";
//                   // A chunk of data has been received.
//                   resp.on("data", (chunk) => {
//                     nftdata += chunk;
//                   });

//                   // The whole response has been received. Print out the result.
//                   resp.on("end", () => {
//                     datalist.push( JSON.parse(JSON.stringify(nftdata)));
//                     //  console.log(JSON.parse(JSON.stringify(nftdata)));
//                   });
//                   //console.log("this is datalist" +datalist+"end of datalist");
//                   resolve(datalist);
//                 })
//                 .on("error", (err) => {
//                   console.log("Error: " + err.message);
//                 });
//             } catch (e) {
//               console.log("error occcured");
//             }
//           } //end of if condition
//         } //end of for loop
//       });

//     });
//     // request.on('error', (err) => {
//     //   console.error(`Encountered an error trying to make a request: ${err.message}`);
//     // });
//   })

// }
