(function($){
var snakerflow = $.snakerflow;

$.extend(true,snakerflow.config.rect,{
	attr : {
	r : 8,
	fill : '#F6F7FF',
	stroke : '#03689A',
	"stroke-width" : 2
}
});

$.extend(true,snakerflow.config.props.props,{
	name : {name:'name', label:'Name', value:'', editor:function(){return new snakerflow.editors.inputEditor();}},
	displayName : {name:'displayName', label:'Display Name', value:'', editor:function(){return new snakerflow.editors.inputEditor();}},
	expireTime : {name:'expireTime', label:'Expected Completion Time', value:'', editor:function(){return new snakerflow.editors.inputEditor();}},
	instanceUrl : {name:'instanceUrl', label:'Instance Url', value:'', editor:function(){return new snakerflow.editors.inputEditor();}},
	instanceNoClass : {name:'instanceNoClass', label:'InstanceNo Class', value:'', editor:function(){return new snakerflow.editors.inputEditor();}}
});

$.extend(true,snakerflow.config.tools.states,{
			start : {
				showType: 'image',
				type : 'start',
				name : {text:'<<start>>'},
				text : {text:'start'},
				img : {src : 'images/48/start_event_empty.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					name: {name:'name',label: 'Name', value:'start', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			end : {
				showType: 'image',
				type : 'end',
				name : {text:'<<end>>'},
				text : {text:'end'},
				img : {src : 'images/48/end_event_terminate.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					name: {name:'name',label: 'Name', value:'end', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			task : {
				showType: 'text',
				type : 'task',
				name : {text:'<<task>>'},
				text : {text:'task'},
				img : {src : 'images/48/task_empty.png',width :48, height:48},
				props : {
					name: {name:'name',label: 'Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: 'Display Name', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					form: {name:'form', label : 'From', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					assignee: {name:'assignee', value:''},
					// assigneeDisplay: {name:'assigneeDisplay', label: '参与者', value:'', editor: function(){return new snakerflow.editors.assigneeEditor('/dialogs/selectDialog.jsp?type=orgUserTree');}},
					// assignmentHandler: {name:'assignmentHandler', label: '参与者处理类', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					taskType: {name:'taskType', label : 'Task Type', value:'', editor: function(){return new snakerflow.editors.selectEditor([{name:'Major',value:'Major'},{name:'Aidant',value:'Aidant'}]);}},
					performType: {name:'performType', label : 'Participation Type', value:'', editor: function(){return new snakerflow.editors.selectEditor([{name:'ANY',value:'ANY'},{name:'ALL',value:'ALL'}]);}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    reminderTime: {name:'reminderTime', label : 'Reminder Time', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    reminderRepeat: {name:'reminderRepeat', label : 'Reminder Repeat', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					expireTime: {name:'expireTime', label: 'Expire Time', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					// autoExecute: {name:'autoExecute', label : '是否自动执行', value:'', editor: function(){return new snakerflow.editors.selectEditor([{name:'否',value:'N'},{name:'是',value:'Y'}]);}},
					callback: {name:'callback', label : 'Callback', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			custom : {
				showType: 'text',
				type : 'custom',
				name : {text:'<<custom>>'},
				text : {text:'custom'},
				img : {src : 'images/48/task_empty.png',width :48, height:48},
				props : {
					name: {name:'name',label: 'Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: 'Display Name', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					clazz: {name:'clazz', label: 'Clazz', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					methodName: {name:'methodName', label : 'Function Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					args: {name:'args', label : 'Args', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			subprocess : {
				showType: 'text',
				type : 'subprocess',
				name : {text:'<<subprocess>>'},
				text : {text:'subprocess'},
				img : {src : 'images/48/task_empty.png',width :48, height:48},
				props : {
					name: {name:'name',label: 'Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: 'Display Name', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					processName: {name:'processName', label: 'Process Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			decision : {
				showType: 'image',
				type : 'decision',
				name : {text:'<<decision>>'},
				text : {text:'decision'},
				img : {src : 'images/48/gateway_exclusive.png',width :48, height:48},
				props : {
					name: {name:'name',label: 'Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					expr: {name:'expr',label: 'Decision Expression', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					handleClass: {name:'handleClass', label: 'Handle Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			fork : {
				showType: 'image',
				type : 'fork',
				name : {text:'<<fork>>'},
				text : {text:'fork'},
				img : {src : 'images/48/gateway_parallel.png',width :48, height:48},
				props : {
					name: {name:'name',label: 'Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			join : {
				showType: 'image',
				type : 'join',
				name : {text:'<<join>>'},
				text : {text:'join'},
				img : {src : 'images/48/gateway_parallel.png',width :48, height:48},
				props : {
					name: {name:'name',label: 'Name', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : 'Pre Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : 'Post Interceptors', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}}
});
})(jQuery);
