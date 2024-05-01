/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import axios from "axios";
import React, { useEffect, useState } from "react";

function Stream() {
  const [streamData, setStreamData] = useState<any>([]);

  // const axios = require('axios');

  // Function to fetch and stream data from the server with a bearer token
  // async function fetchAndStreamData(url, token, requestData) {
  //     try {
  //         const response = await axios.post(url, requestData, {
  //             headers: {
  //                 'Authorization': `Bearer ${token}`,
  //                 'Content-Type': 'application/json',
  //             },
  //             responseType: 'stream', // Set responseType to 'stream' to receive a readable stream
  //         });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await fetch("https://percievenowchat2.azurewebsites.net/gautam", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   stream: true
          // })
        })) as any;

        const responseData = await response.text(); // Get the response as text

        console.log(responseData); // Log the response data

        // setStreamData((prevData: any) => [...prevData, newData]);

        const reader = response.body.getReader() as any;
        let done = false;

        while (!done) {
          const { done: isDone, value } = await reader.read();
          done = isDone;
          if (!done) {
            // Process the chunked data
            console.log(value);
            // Update state with chunked data if necessary
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => {
      // clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>Streaming Data</h1>
      <ul>
        {streamData.map((data: any, index: any) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stream;
