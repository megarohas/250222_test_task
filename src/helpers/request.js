export function sendRequest(
  params = {
    type: "GET",
    callback: () => {},
    body: undefined,
    url: "https://api.interview.flowmapp.com/tasks",
    mode: "cors",
  }
) {
  let config = {
    method: params.type,
    mode: params.mode,
    body: JSON.stringify(params.body),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(params.url, config)
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      let result = {};
      try {
        result = JSON.parse(response);
      } catch (e) {
        result = {};
        console.log("it's not a json");
      } finally {
        return result;
      }
    })
    .then((data) => {
      params.callback(data);
    })
    .catch((e) => {
      console.log(e);
      alert("Something went wrong!");
    });
}
