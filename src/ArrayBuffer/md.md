# DataView 视图

ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

```js
ArrayBuffer.prototype.byteLength
ArrayBuffer.prototype.slice()
ArrayBuffer.isView()
```


ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。
ArrayBuffer有两种视图，一种是TypedArray视图（数组成员都是同一个数据类型），另一种是DataView视图（数组成员可以是不同的数据类型）。

# TypedArray 视图

目前，TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数
| 数据类型| 字节长度 | 构造函数 | 含义| 对应的 C 语言类型     |
|--|--|--|--|--|
| Int8    | 1    | Int8Array | 8 位带符号整数 | signed char |
| Uint8   | 1    | Uint8Array | 8 位不带符号整数 | unsigned char |
| Uint8C  | 1    | Uint8ClampedArray | 8 位不带符号整数（自动过滤溢出） | unsigned char |
| Int16   | 2    | Int16Array | 16 位带符号整数 | short |
| Uint16  | 2    | Uint16Array | 16 位不带符号整数 | unsigned short |
| Int32   | 4    | Int32Array | 32 位带符号整数 | int |
| Uint32  | 4    | Uint32Array | 32 位不带符号的整数 | unsigned int |
| Float32 | 4    | Float32Array | 32 位浮点数 | float |
| Float64 | 8    | Float64Array | 64 位浮点数 | double |


普通数组与 TypedArray 数组的差异主要在以下方面。

* TypedArray 数组的所有成员，都是同一种类型。
* TypedArray 数组的成员是连续的，不会有空位。
* TypedArray 数组成员的默认值为 0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)返回一个 TypedArray 数组，里面 10 个成员都是 0。
* TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。
## 构造函数
TypedArray 数组提供 9 种构造函数，用来生成相应类型的数组实例。
```js
// 注意，byteOffset必须与所要建立的数据类型一致，否则会报错。
new TypedArray(buffer [, byteOffset=0 [, length]]); 
// 不通过ArrayBuffer对象生成视图，直接分配内存而生成
new TypedArray(length)
// 接受另一个TypedArray实例作为参数
new TypedArray(typedArray)
// 普通数组
new TypedArray(arrayLikeObject)
// ES2017中新增
new TypedArray();
new TypedArray(object); 

// TypedArray 指的是以下的其中之一： 
Int8Array(); 
Uint8Array(); 
Uint8ClampedArray();
Int16Array(); 
Uint16Array();
Int32Array(); 
Uint32Array(); 
Float32Array(); 
Float64Array();
```

TypedArray 数组也可以转换回普通数组。
```js
[...typedArray];
// or
Array.from(typedArray);
// or
Array.prototype.slice.call(typedArray);
```
普通数组的操作方法和属性，对 TypedArray 数组完全适用(除 concat 外)。

## 字节序 
TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序
DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。

字节序，即字节在电脑中存放时的序列与输入（输出）时的序列是先到的在前还是后到的在前。
字节序经常被分为两类：
1. Big-Endian（大端）：高位字节排放在内存的低地址端，低位字节排放在内存的高地址端。
2. Little-Endian（小端）：低位字节排放在内存的低地址端，高位字节排放在内存的高地址端。

## ArrayBuffer 与字符串的互相转换
TextEncoder 方法 TextDecoder 方法 

## 溢出

TypedArray 数组的溢出处理规则，简单来说，就是抛弃溢出的位，然后按照视图类型进行解释

转换规则，可以这样表示。
* 正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去 1。
* 负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值的绝对值，再加上 1。

Uint8ClampedArray规定，凡是发生正向溢出，该值一律等于当前数据类型的最大值，即 255；如果发生负向溢出，该值一律等于当前数据类型的最小值，即 0

## 复合视图
通过指定视图的 offset ，使一段内存中依次存放不同的数据类型

# DataView 视图

DataView实例提供 8 个方法读取内存。

* getInt8：读取 1 个字节，返回一个 8 位整数。
* getUint8：读取 1 个字节，返回一个无符号的 8 位整数。
* getInt16：读取 2 个字节，返回一个 16 位整数。
* getUint16：读取 2 个字节，返回一个无符号的 16 位整数。
* getInt32：读取 4 个字节，返回一个 32 位整数。
* getUint32：读取 4 个字节，返回一个无符号的 32 位整数。
* getFloat32：读取 4 个字节，返回一个 32 位浮点数。
* getFloat64：读取 8 个字节，返回一个 64 位浮点数。

```js
// 读取一个字节：参数都是一个字节序号（非负整数），表示从哪个字节开始读取
new DataView(buffer).getUint8(0)
// 读取两个或以上字节：需要指定小端字节序还是大端字节序
// 小端字节序
new DataView(buffer).getUint16(1, true);
// 大端字节序
new DataView(buffer).getUint16(3, false);
```

DataView 视图提供 8 个方法写入内存。

* setInt8：写入 1 个字节的 8 位整数。
* setUint8：写入 1 个字节的 8 位无符号整数。
* setInt16：写入 2 个字节的 16 位整数。
* setUint16：写入 2 个字节的 16 位无符号整数。
* setInt32：写入 4 个字节的 32 位整数。
* setUint32：写入 4 个字节的 32 位无符号整数。
* setFloat32：写入 4 个字节的 32 位浮点数。
* setFloat64：写入 8 个字节的 64 位浮点数。

```js
// 写入一个字节：第一个参数是字节序号，表示从哪个字节开始写入，第二个参数为写入的数据。
new DataView(buffer).setInt8(0,1)
// 写入两个或以上字节：需要指定小端字节序还是大端字节序。false或者undefined表示使用大端字节序写入，true表示使用小端字节序写入。
// 小端字节序
new DataView(buffer).setInt32(4, 25, false);
// 大端字节序
new DataView(buffer).setFloat32(8, 2.5, true);
```



