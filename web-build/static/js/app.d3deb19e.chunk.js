(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{230:function(e,t,a){"use strict";var n=a(99),r=a(1),o=a.n(r),c=a(2),i=a(149),u=a(33),s=a.n(u),l=a(26),f=a(4),m=a(52),h=a(66);a(292),a(167);h.initializeApp({apiKey:"AIzaSyA8CayNjq_3waCPH533_Haij8scNzIM_H8",authDomain:"evolve-6b9a3.firebaseapp.com",databaseURL:"https://evolve-6b9a3.firebaseio.com",projectId:"evolve-6b9a3",storageBucket:"evolve-6b9a3.appspot.com",messagingSenderId:"408948735077",appId:"1:408948735077:web:11c577a47ef8c0acac5a8c",measurementId:"G-S5DY8CVKB0"}),h.auth().onAuthStateChanged((function(e){null!=e&&console.log("We are authenticated now!"),console.log({user:e})}));var g=function(e){var t=e.navigation,a=Object(r.useState)(""),c=s()(a,2),i=c[0],u=c[1],g=h.database().ref("users").child(h.auth().currentUser.uid);return Object(r.useEffect)((function(){g.on("value",(function(e){var t=e.val().phoneNumber||"";u(t)}))}),[]),o.a.createElement(f.a,{style:d.container},o.a.createElement(l.a,null,"Enter Your Phone Number to Receive Bot Alerts"),o.a.createElement(m.b,{placeholder:"Phone Number",onChangeText:u,value:i}),o.a.createElement(m.a,{onPress:function(){g.update({phoneNumber:i})},title:"Submit"}),o.a.createElement(m.a,{onPress:function(){h.auth().signOut().then((function(e){console.log({response:e})})).catch((function(e){console.log({err:e})})).then((function(e){t.navigate("Login")}))},title:"Sign Out"}),o.a.createElement(n.a,{style:"auto"}))},d=c.a.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}}),b=a(15);var p=function(e){var t=e.navigation,a=Object(r.useState)(""),n=s()(a,2),c=n[0],i=n[1],u=Object(r.useState)(""),g=s()(u,2),d=g[0],p=g[1],E=Object(r.useState)(""),S=s()(E,2),j=S[0],w=S[1],C=Object(r.useState)(!1),y=s()(C,2),P=(y[0],y[1]),O=Object(r.useState)(0),x=s()(O,2),I=(x[0],x[1]);return o.a.createElement(f.a,{style:v.container},o.a.createElement(m.b,{placeholder:"Email",onChangeText:p,value:d}),o.a.createElement(m.b,{placeholder:"Password",secureTextEntry:!0,onChangeText:i,value:c}),o.a.createElement(m.a,{onPress:function(){""===d?(w("Email can't be empty."),I(1)):""===c?(w("Password can't be empty."),I(1)):(P(!0),function(e){var t=e.email,a=e.password;return h.auth().signInWithEmailAndPassword(t,a)}({email:d,password:c}).then((function(e){var a=e.user.uid;h.database().ref("users").child(a).once("value").then((function(e){var a=e.val();console.log({user:a}),t.navigate("Home",{user:a})}))})).catch((function(e){P(!1),w(String(e)),I(1)})))},title:"Login"}),"web"==b.a.OS?o.a.createElement(m.a,{onPress:function(){(function(){var e=new h.auth.GoogleAuthProvider;return console.log({provider:e}),h.auth().signInWithPopup(e).then((function(e){return e})).catch((function(e){return console.log({error:e})}))})().then((function(e){var a=e.user.uid,n={id:a,email:e.user.email};h.database().ref("users").child(a).update(n).then((function(){t.navigate("Home",{user:n})})).catch((function(e){alert(e)}))}))},title:"Google"}):null,o.a.createElement(m.a,{onPress:function(){t.navigate("SignUp")},title:"SignUp"}),o.a.createElement(l.a,null,j))},v=c.a.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}});var E=function(e){var t=e.navigation,a=Object(r.useState)(""),n=s()(a,2),c=n[0],i=n[1],u=Object(r.useState)(""),g=s()(u,2),d=g[0],b=g[1],p=Object(r.useState)(""),v=s()(p,2),E=v[0],j=v[1],w=Object(r.useState)(!1),C=s()(w,2),y=(C[0],C[1]),P=Object(r.useState)(0),O=s()(P,2),x=(O[0],O[1]);return o.a.createElement(f.a,{style:S.container},o.a.createElement(m.b,{placeholder:"Email",onChangeText:b,value:d}),o.a.createElement(m.b,{placeholder:"Password",secureTextEntry:!0,onChangeText:i,value:c}),o.a.createElement(m.a,{onPress:function(){""===d?(j("Email can't be empty."),x(1)):""===c?(j("Password can't be empty."),x(1)):(y(!0),function(e){var t=e.email,a=e.password;return h.auth().createUserWithEmailAndPassword(t,a)}({email:d,password:c}).then((function(e){var a=e.user.uid,n={id:a,email:d};h.database().ref("users").child(a).set(n).then((function(){t.navigate("Home",{user:n})})).catch((function(e){alert(e)}))})).catch((function(e){y(!1),console.log({error:e}),j(String(e)),x(1)})))},title:"Sign Up"}),o.a.createElement(m.a,{onPress:function(){t.navigate("Login")},title:"Back"}),o.a.createElement(l.a,null,E))},S=c.a.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}}),j=Object(i.createAppContainer)(Object(i.createSwitchNavigator)({Login:{screen:p},Home:{screen:g},SignUp:{screen:E}},{headerMode:"none",cardStyle:{backgroundColor:"white"}}));t.a=j,c.a.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}})},231:function(e,t,a){e.exports=a(311)}},[[231,1,2]]]);
//# sourceMappingURL=app.d3deb19e.chunk.js.map