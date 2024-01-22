"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[7343],{399:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var t=i(5893),o=i(1151);const a={layout:"docs",title:"Unconnected Wires",section:"chisel3"},s="Unconnected Wires",l={id:"explanations/unconnected-wires",title:"Unconnected Wires",description:"The Invalidate API (#645) adds support to Chisel",source:"@site/docs/explanations/unconnected-wires.md",sourceDirName:"explanations",slug:"/explanations/unconnected-wires",permalink:"/docs/explanations/unconnected-wires",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/unconnected-wires.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Unconnected Wires",section:"chisel3"},sidebar:"tutorialSidebar",previous:{title:"Supported Hardware",permalink:"/docs/explanations/supported-hardware"},next:{title:"Warnings",permalink:"/docs/explanations/warnings"}},r={},c=[{value:"API",id:"api",level:3},{value:"Determining the unconnected element",id:"determining-the-unconnected-element",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"unconnected-wires",children:"Unconnected Wires"}),"\n",(0,t.jsxs)(n.p,{children:["The Invalidate API ",(0,t.jsx)(n.a,{href:"https://github.com/freechipsproject/chisel3/pull/645",children:"(#645)"})," adds support to Chisel\nfor reporting unconnected wires as errors."]}),"\n",(0,t.jsxs)(n.p,{children:["Prior to this pull request, Chisel automatically generated a firrtl ",(0,t.jsx)(n.code,{children:"is invalid"})," for ",(0,t.jsx)(n.code,{children:"Module IO()"}),", and each ",(0,t.jsx)(n.code,{children:"Wire()"})," definition.\nThis made it difficult to detect cases where output signals were never driven.\nChisel now supports a ",(0,t.jsx)(n.code,{children:"DontCare"})," element, which may be connected to an output signal, indicating that that signal is intentionally not driven.\nUnless a signal is driven by hardware or connected to a ",(0,t.jsx)(n.code,{children:"DontCare"}),', Firrtl will complain with a "not fully initialized" error.']}),"\n",(0,t.jsx)(n.h3,{id:"api",children:"API"}),"\n",(0,t.jsxs)(n.p,{children:["Output signals may be connected to DontCare, generating a ",(0,t.jsx)(n.code,{children:"is invalid"})," when the corresponding firrtl is emitted."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"\nclass Out extends Bundle { \n  val debug = Bool()\n  val debugOption = Bool()\n}\nval io = new Bundle { val out = new Out }\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"io.out.debug := true.B\nio.out.debugOption := DontCare\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This indicates that the signal ",(0,t.jsx)(n.code,{children:"io.out.debugOption"}),' is intentionally not driven and firrtl should not issue a "not fully initialized"\nerror for this signal.']}),"\n",(0,t.jsx)(n.p,{children:"This can be applied to aggregates as well as individual signals:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nclass ModWithVec extends Module {\n  // ...\n  val nElements = 5\n  val io = IO(new Bundle {\n    val outs = Output(Vec(nElements, Bool()))\n  })\n  io.outs <> DontCare\n  // ...\n}\n\nclass TrivialInterface extends Bundle {\n  val in  = Input(Bool())\n  val out = Output(Bool())\n}\n\nclass ModWithTrivalInterface extends Module {\n  // ...\n  val io = IO(new TrivialInterface)\n  io <> DontCare\n  // ...\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"determining-the-unconnected-element",children:"Determining the unconnected element"}),"\n",(0,t.jsx)(n.p,{children:"I have an interface with 42 wires.\nWhich one of them is unconnected?"}),"\n",(0,t.jsx)(n.p,{children:"The firrtl error message should contain something like:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'firrtl.passes.CheckInitialization$RefNotInitializedException:  @[:@6.4] : [module Router]  Reference io is not fully initialized.\n   @[Decoupled.scala 38:19:@48.12] : node _GEN_23 = mux(and(UInt<1>("h1"), eq(UInt<2>("h3"), _T_84)), _GEN_2, VOID) @[Decoupled.scala 38:19:@48.12]\n   @[Router.scala 78:30:@44.10] : node _GEN_36 = mux(_GEN_0.ready, _GEN_23, VOID) @[Router.scala 78:30:@44.10]\n   @[Router.scala 75:26:@39.8] : node _GEN_54 = mux(io.in.valid, _GEN_36, VOID) @[Router.scala 75:26:@39.8]\n   @[Router.scala 70:50:@27.6] : node _GEN_76 = mux(io.load_routing_table_request.valid, VOID, _GEN_54) @[Router.scala 70:50:@27.6]\n   @[Router.scala 65:85:@19.4] : node _GEN_102 = mux(_T_62, VOID, _GEN_76) @[Router.scala 65:85:@19.4]\n   : io.outs[3].bits.body <= _GEN_102\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The first line is the initial error report.\nSuccessive lines, indented and beginning with source line information indicate connections involving the problematic signal.\nUnfortunately, if these are ",(0,t.jsx)(n.code,{children:"when"})," conditions involving muxes, they may be difficult to decipher.\nThe last line of the group, indented and beginning with a ",(0,t.jsx)(n.code,{children:":"})," should indicate the uninitialized signal component.\nThis example (from the ",(0,t.jsx)(n.a,{href:"https://github.com/ucb-bar/chisel-tutorial/blob/release/src/main/scala/examples/Router.scala",children:"Router tutorial"}),")\nwas produced when the output queue bits were not initialized.\nThe old code was:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"  io.outs.foreach { out => out.noenq() }\n"})}),"\n",(0,t.jsxs)(n.p,{children:["which initialized the queue's ",(0,t.jsx)(n.code,{children:"valid"})," bit, but did not initialize the actual output values.\nThe fix was:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"  io.outs.foreach { out =>\n    out.bits := 0.U.asTypeOf(out.bits)\n    out.noenq()\n  }\n"})})]})}function u(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>s});var t=i(7294);const o={},a=t.createContext(o);function s(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);