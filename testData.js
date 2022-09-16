
const testData = {
  users:[
    {
      id:0,
      name:'Jonas',
      transactions:[
        {date:"eno", value:-18},
        {date:"eno", value:-18},
        {date:"eno", value:50},
        {date:"eno", value:-18},
        {date:"eno", value:-18},
        {date:"eno", value:-18},
        {date:"eno", value:50},
        {date:"eno", value:-18},
        {date:"eno", value:-18}
      ]
    },
    {
      id:1,
      name:'Martin',
      transactions:[
        {date:"eno", value:20},
        {date:"eno", value:-18},
        {date:"eno", value:-18},
        {date:"eno", value:-18},
        {date:"eno", value:120},
        {date:"eno", value:-18},
        {date:"eno", value:-18},
      ]
    },
    {
      id:2,
      name:'Finn',
      transactions:[
        {date:"eno", value:200},
        {date:"eno", value:-18},
        {date:"eno", value:-18},
        {date:"eno", value:-18},
        {date:"eno", value:-18}
      ]
    },
    {
      id:3,
      name:'Edvard',
      transactions:[
        {date:"eno", value:100},
        {date:"eno", value:-18},
      ]
    }
  ]
};

testData.users.map(u => (u.transactions.map(t => (t.date = new Date))));

export function addUser(user, balance){
  testData.users.push({
    id:testData.users.length,
    name:user,
    transactions:[balance]
  });
  console.log(testData);
}

export default testData;
