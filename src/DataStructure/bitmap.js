class BitMap {
  constructor(size) {
    this.bit_arr = new Array(size);
    for (let i = 0; i < this.bit_arr.length; i++) {
      this.bit_arr[i] = 0;
    }
  }
  addMember(member) {
    const arr_index = Math.floor(member / 32);
    const bit_index = member % 32;
    this.bit_arr[arr_index] = this.bit_arr[arr_index] | (1 << bit_index);
  }
  isExist(member) {
    const arr_index = Math.floor(member / 32);
    const bit_index = member % 32;
    const value = this.bit_arr[arr_index] & (1 << bit_index);
    return !!value;
  }
}

// let bit_map = new BitMap(4);
// let arr = [0, 3, 5, 6, 9, 34, 23, 78, 99];
// for (let i = 0; i < arr.length; i++) {
//   bit_map.addMember(arr[i]);
// }

// console.log(bit_map.isExist(3));
// console.log(bit_map.isExist(7));
// console.log(bit_map.isExist(78));

/* 布隆过滤器 */
/*
 * 布隆过滤器（Bloom Filter）是1970年由布隆提出的。
 * 它实际上是一个很长的二进制向量和一系列随机映射函数。
 * 布隆过滤器可以用于检索一个元素是否在一个集合中。
 * 它的优点是空间效率和查询时间都比一般的算法要好的多，缺点是有一定的误识别率和删除困难。
 */
/* 
布隆过滤器的基本思路和BitMap是一样的，可以把布隆过滤器看做是BitMap的扩展。
为了解决冲突率，布隆过滤器要求使用k个hash函数。
新增一个key时，把key散列成k个整数，然后在数组中将这个k个整数所对应的二进制位设置为1，
判断某个key是否存在时，还是使用k个hash函数对key进行散列，得到k个整数，如果这k个整数所对应的二进制位都是1，就说明这个key存在，否则，这个key不存在。 
*/

class BoolmFilter {
  constructor(max_count, error_rate) {
    // 位图映射变量
    this.bitMap = [];
    // 最多可放的数量
    this.max_count = max_count;
    // 错误率
    this.error_rate = error_rate;
    // 位图变量的长度
    this.bit_size = Math.ceil(
      max_count * (-Math.log(error_rate) / (Math.log(2) * Math.log(2)))
    );
    // 哈希数量
    this.hash_ount = Math.ceil(Math.log(2) * (this.bit_size / max_count));
  }
  // murmurhash的实现 抄的
  murmurhash3_32_gc(key, seed) {
    let remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
      k1 =
        (key.charCodeAt(i) & 0xff) |
        ((key.charCodeAt(++i) & 0xff) << 8) |
        ((key.charCodeAt(++i) & 0xff) << 16) |
        ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;

      k1 =
        ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
        0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 =
        ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
        0xffffffff;

      h1 ^= k1;
      h1 = (h1 << 13) | (h1 >>> 19);
      h1b =
        ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
      h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
    }

    k1 = 0;

    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
        k1 ^= key.charCodeAt(i) & 0xff;

        k1 =
          ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
          0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 =
          ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
          0xffffffff;
        h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 =
      ((h1 & 0xffff) * 0x85ebca6b +
        ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) &
      0xffffffff;
    h1 ^= h1 >>> 13;
    h1 =
      ((h1 & 0xffff) * 0xc2b2ae35 +
        ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) &
      0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
  }
  // 设置位的值
  _set_bit(bit) {
    let arr_index = Math.floor(bit / 32);
    let bit_index = Math.floor(bit % 32);
    this.bitMap[arr_index] |= 1 << bit_index;
  }

  // 读取位的值
  _get_bit(bit) {
    let arr_index = Math.floor(bit / 32);
    let bit_index = Math.floor(bit % 32);
    return (this.bitMap[arr_index] &= 1 << bit_index);
  }

  add(key) {
    if (this.isExist(key)) {
      return -1; //表示已经存在
    }
    for (let i = 0; i < this.hash_ount; i++) {
      let hash_value = this.murmurhash3_32_gc(key, i);
      this._set_bit(Math.abs(Math.floor(hash_value % this.bit_size)));
    }
  }
  isExist(key) {
    for (let i = 0; i < this.hash_ount; i++) {
      let hash_value = this.murmurhash3_32_gc(key, i);
      if (!this._get_bit(Math.abs(Math.floor(hash_value % this.bit_size)))) {
        return false;
      }
    }
    return true;
  }
}

// let bloomFilter = new BoolmFilter(1000000, 0.01);

// bloomFilter.add('https://blog.csdn.net/houzuoxin/article/details/20907911');
// bloomFilter.add('https://www.jianshu.com/p/888c5eaebabd');
// console.log(
//   bloomFilter.isExist(
//     'https://blog.csdn.net/houzuoxin/article/details/20907911'
//   )
// );
// console.log(bloomFilter.isExist('https://www.jianshu.com/p/888c5eaebabd'));
// console.log(bloomFilter.isExist('https://www.jianshu.com/p/888c5eaebabd435'));

// 支持负数
class SuperBitMap {
  constructor() {
    this.positive_bit_map = new BitMap();
    this.negative_bit_map = new BitMap();
  }
  addMember(member) {
    if (member >= 0) {
      this.positive_bit_map.addMember(member);
    } else {
      this.negative_bit_map.addMember(member);
    }
  }
  isExist(member) {
    return member >= 0
      ? this.positive_bit_map.isExist(member)
      : this.negative_bit_map.isExist(member);
  }
}
// let arr = [1, 3, -6, -8, 8, 9];
// let super_bm = new SuperBitMap();

// for (let i = 0; i < arr.length; i++) {
//   super_bm.addMember(arr[i]);
// }

// console.log(super_bm.isExist(-8));
// console.log(super_bm.isExist(8));
// console.log(super_bm.isExist(9));
// console.log(super_bm.isExist(-6));
// console.log(super_bm.isExist(-5));

/* 
使用偶数位表示是否重复
使用奇数为表示是否重复
*/
class RepeatBitMap {
  constructor(size) {
    this.bit_arr = new Array(size);
    for (let i = 0; i < this.bit_arr.length; i++) {
      this.bit_arr[i] = 0;
    }
  }
  addMember(member) {
    const arr_index = Math.floor(member / 16);
    const bit_index = member % 16;
    if (this.isExist(member)) {
      this.bit_arr[arr_index] |= 1 << (bit_index * 2 + 1);
    } else {
      this.bit_arr[arr_index] |= 1 << (bit_index * 2);
    }
  }
  isExist(member) {
    const arr_index = Math.floor(member / 16);
    const bit_index = member % 16;
    const value = this.bit_arr[arr_index] & (1 << (bit_index * 2));
    return value != 0;
  }
  isRepeat(member) {
    const arr_index = parseInt(member / 16); // 决定在数组中的索引
    const bit_index = member % 16; // 决定在整数的32个bit位的哪一位上
    const value = this.bit_arr[arr_index] & (1 << (bit_index * 2 + 1));
    return value != 0;
  }
}

let arr_1 = [1, 3, 4, 5, 7, 4, 8, 9, 2, 9];
let bm = new RepeatBitMap(2);
for (let i = 0; i < arr_1.length; i++) {
  bm.addMember(arr_1[i]);
}
let arr = [];
for (let i = 0; i <= 9; i++) {
  if (bm.isRepeat(i)) {
    arr.push(i);
  }
}
console.log(arr);
