import axios from "axios";

async function getData() {
  try {
    console.log(typeof window)
    if(typeof window === 'undefined') {
      const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser', {
        headers: {
          Host: 'stubhub.com'
        }
      });
      return data;
    }

    const { data } = await axios.get('/api/users/currentUser');
    return data;
  }
  catch(e){
    console.log("Error fetching data", e)
  }
};

async function Page(props: any) {
  console.log(props)
  const usersData = await getData();
  console.log("usersData", usersData)
  return <main>
    <div>Hi {usersData?.currentUser}</div>
  </main>
}

export default Page;