import{a as r,o as c,b as d,e as s,k as p,l as i,v as _,m as u}from"./entry.c4d07d3c.js";const h={data(){return{email:"",password:""}},methods:{async submit(){let e=await fetch("http://localhost:7000/login",{method:"POST",credentials:"include",headers:{"Content-type":"application/json"},body:JSON.stringify({email:this.email,password:this.password})});if(e.ok){let t=await e.json();alert(t.message),await this.$router.push("/redirect"),location.reload()}else{let t=await e.json();alert(t.message),await this.$router.push("/register")}}}},g={class:"container"},m={class:"screen"},b={class:"screen__content"},f={class:"login__field"},w=s("i",{class:"login__icon fas fa-user"},null,-1),k={class:"login__field"},v=s("i",{class:"login__icon fas fa-lock"},null,-1),y=s("button",{class:"button login__submit"},[s("span",{class:"button__text"},"Log In Now"),s("i",{class:"button__icon fas fa-chevron-right"})],-1),x=u('<div class="screen__background"><span class="screen__background__shape screen__background__shape4"></span><span class="screen__background__shape screen__background__shape3"></span><span class="screen__background__shape screen__background__shape2"></span><span class="screen__background__shape screen__background__shape1"></span></div>',1);function N(l,e,t,S,n,o){return c(),d("div",g,[s("div",m,[s("div",b,[s("form",{class:"login",onSubmit:e[2]||(e[2]=p((...a)=>o.submit&&o.submit(...a),["prevent"]))},[s("div",f,[w,i(s("input",{type:"text",class:"login__input",placeholder:"Email","onUpdate:modelValue":e[0]||(e[0]=a=>n.email=a),required:""},null,512),[[_,n.email]])]),s("div",k,[v,i(s("input",{type:"password",class:"login__input",placeholder:"Password",required:"","onUpdate:modelValue":e[1]||(e[1]=a=>n.password=a)},null,512),[[_,n.password]])]),y],32)]),x])])}const j=r(h,[["render",N]]);export{j as default};
