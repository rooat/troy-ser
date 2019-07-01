var arr =[{ "parent": 'abcdef', "children": 'abc001' },
  { "parent": 'abc001', "children": 'abc002' },
  { "parent": 'abc002', "children": 'abc003' },
  { "parent": 'abc003', "children": 'abc004' },
  { "parent": 'abc004', "children": 'abc005' },
  { "parent": 'abc003', "children": 'abc006' },
  { "parent": 'abc002', "children": 'abc007' },
  { "parent": 'abc007', "children": 'abc008' },
  { "parent": 'abc007', "children": 'abc009' },
  { "parent": 'abc007', "children": 'abc010' },
  { "parent": 'abc007', "children": 'abc011' },
  { "parent": 'abc011', "children": 'abc012' },
  { "parent": 'abc011', "children": 'abc013' },
  { "parent": 'abc013', "children": 'abc014' },
  { "parent": 'abc016', "children": 'abc015' },
  { "parent": 'abc013', "children": 'abc016' },
  { "parent": 'abc002', "children": 'abc017' },
  { "parent": 'abc007', "children": 'abc018' },
  { "parent": 'abc007', "children": 'abc019' },
  { "parent": 'abc007', "children": 'abc020' },
  { "parent": 'abc007', "children": 'abc021' },
  { "parent": 'abc011', "children": 'abc022' },
  { "parent": 'abc011', "children": 'abc023' },
  { "parent": 'abc013', "children": 'abc024' },
  { "parent": 'abc016', "children": 'abc025' },
  { "parent": 'abc013', "children": 'abc026' },
  { "parent": 'abc002', "children": 'abc027' },
  { "parent": 'abc007', "children": 'abc028' },
  { "parent": 'abc007', "children": 'abc029' },
  { "parent": 'abc007', "children": 'abc030' },
  { "parent": 'abc007', "children": 'abc031' },
  { "parent": 'abc011', "children": 'abc032' },
  { "parent": 'abc011', "children": 'abc033' },
  { "parent": 'abc013', "children": 'abc034' },
  { "parent": 'abc016', "children": 'abc035' },
  { "parent": 'abc013', "children": 'abc036' }];
// let obj={
//   			"code":arr[i].children,
//   			"index":index
//   		}
//   		sss.push(obj)

var sss =new Array();

  function test(parent){//推荐码
  	let index=0;
  	for(var i=0;i<arr.length;i++){
  		
  		let parent1=arr[i].parent;
  		if(parent1==parent){//
			test(arr[i].parent);
  		}
  		
  	}
  	return index;
  }

var ss = test('abc002')
console.log("sss==",ss)






