var bloodArray = ['请选择血型','A', 'B', 'AB', 'O', 'other']
var objectBloodArray = [
  {
    id: 0,
    name: '请选择血型'
  },
  {
    id: 1,
    name: 'A'
  },
  {
    id: 2,
    name: 'B'
  },
  {
    id: 3,
    name: 'AB'
  },
  {
    id: 4,
    name: 'O'
  },
  {
    id: 5,
    name: 'other'
  }
]
var cultureArray = ['请选择学历','小学', '初中', '高中', '中专', '大专', '本科', '硕士', '博士', '其它']
var objectCultureArray = [
  {
    id: 0,
    name: '请选择学历'
  }, {
    id: 1,
    name: '小学'
  },
  {
    id: 2,
    name: '初中'
  },
  {
    id: 3,
    name: '高中'
  },
  {
    id: 4,
    name: '中专'
  },
  {
    id: 5,
    name: '大专'
  },
  {
    id: 6,
    name: '本科'
  },
  {
    id: 7,
    name: '硕士'
  },
  {
    id: 8,
    name: '博士'
  },
  {
    id: 9,
    name: '其它'
  }
]
var marriageArray = ['请选择婚姻情况','未婚', '已婚', '离婚', '丧偶']
var objectMarriageArray = [
  {
    id: 0,
    name: '请选择婚姻情况'
  },
  {
    id: 1,
    name: '未婚'
  },
  {
    id: 2,
    name: '已婚'
  },
  {
    id: 3,
    name: '离婚'
  },
  {
    id: 4,
    name: '丧偶'
  }
]
var industryArray = [
  '请选择行业',
  '计算机硬件及网络设备',
  '计算机软件',
  'IT服务（系统/数据/维护）/多领域经营',
  '互联网/电子商务',
  '网络游戏',
  '通讯（设备/运营/增值服务）',
  '电子技术/半导体/集成电路',
  '仪器仪表及工业自动化',
  '金融/银行/投资/基金/证券',
  '保险',
  '房地产/建筑/建材/工程',
  '家居/室内设计/装饰装潢',
  '物业管理/商业中心',
  '广告/会展/公关/市场推广',
  '媒体/出版/影视/文化/艺术',
  '咨询/管理产业/法律/财会',
  '印刷/包装/造纸',
  '检验/检测/认证',
  '教育/培训',
  '贸易/进出口',
  '中介服务',
  '快速消费品（食品/饮料/烟酒/化妆品）',
  '零售/批发',
  '办公用品及设备',
  '耐用消费品（服装服饰/纺织/皮革/家具/家电）',
  '大型设备/机电设备/重工业',
  '礼品/玩具/工艺美术/收藏品',
  '汽车/摩托车（制造/维护/配件/销售/服务）',
  '加工制造（原料加工/模具）',
  '医药/生物工程',
  '交通/运输/物流',
  '酒店/餐饮',
  '娱乐/体育/休闲',
  '医疗/护理/美容/保健',
  '医疗设备/器械其它',
  '能源/矿产/采掘/冶炼',
  '电气/电力/水利',
  '旅游/度假',
  '石油/石化/化工',
  '政府/公共事业/非盈利机构',
  '环保',
  '航空/航天',
  '学术/科研',
  '农/林/牧/渔',
  '跨领域经营',
  '其它'
]
var objectIndustryArray = [
  {
    id: 0,
    name: '请选择行业'
  },
  {
    id: 1,
    name: '计算机硬件及网络设备'
  },
  {
    id: 2,
    name: '计算机软件'
  },
  {
    id: 3,
    name: 'IT服务（系统/数据/维护）/多领域经营'
  },
  {
    id: 4,
    name: '互联网/电子商务'
  },
  {
    id: 5,
    name: '网络游戏'
  },
  {
    id: 6,
    name: '通讯（设备/运营/增值服务）'
  },
  {
    id: 7,
    name: '电子技术/半导体/集成电路'
  },
  {
    id: 8,
    name: '仪器仪表及工业自动化'
  },
  {
    id: 9,
    name: '金融/银行/投资/基金/证券'
  },
  {
    id: 10,
    name: '保险'
  },
  {
    id: 11,
    name: '房地产/建筑/建材/工程'
  },
  {
    id: 12,
    name: '家居/室内设计/装饰装潢'
  },
  {
    id: 13,
    name: '物业管理/商业中心'
  },
  {
    id: 14,
    name: '广告/会展/公关/市场推广'
  },
  {
    id: 15,
    name: '媒体/出版/影视/文化/艺术'
  },
  {
    id: 16,
    name: '咨询/管理产业/法律/财会'
  },
  {
    id: 17,
    name: '印刷/包装/造纸'
  },
  {
    id: 18,
    name: '检验/检测/认证'
  },
  {
    id: 19,
    name: '教育/培训'
  },
  {
    id: 20,
    name: '贸易/进出口'
  },
  {
    id: 21,
    name: '中介服务'
  },
  {
    id: 22,
    name: '快速消费品（食品/饮料/烟酒/化妆品）'
  },
  {
    id: 23,
    name: '零售/批发'
  },
  {
    id: 24,
    name: '办公用品及设备'
  },
  {
    id: 25,
    name: '耐用消费品（服装服饰/纺织/皮革/家具/家电）'
  },
  {
    id: 26,
    name: '大型设备/机电设备/重工业'
  },
  {
    id: 27,
    name: '礼品/玩具/工艺美术/收藏品'
  },
  {
    id: 28,
    name: '汽车/摩托车（制造/维护/配件/销售/服务）'
  },
  {
    id: 29,
    name: '加工制造（原料加工/模具）丧偶'
  },
  {
    id: 30,
    name: '医药/生物工程'
  },
  {
    id: 31,
    name: '交通/运输/物流'
  },
  {
    id: 32,
    name: '酒店/餐饮'
  },
  {
    id: 33,
    name: '娱乐/体育/休闲'
  },
  {
    id: 34,
    name: '医疗/护理/美容/保健'
  },
  {
    id: 35,
    name: '医疗设备/器械其它'
  },
  {
    id: 36,
    name: '能源/矿产/采掘/冶炼'
  },
  {
    id: 37,
    name: '电气/电力/水利'
  },
  {
    id: 38,
    name: '旅游/度假'
  },
  {
    id: 39,
    name: '石油/石化/化工'
  },
  {
    id: 40,
    name: '政府/公共事业/非盈利机构'
  },
  {
    id: 41,
    name: '环保'
  },
  {
    id: 42,
    name: '航空/航天丧偶'
  },
  {
    id: 43,
    name: '学术/科研'
  },
  {
    id: 44,
    name: '农/林/牧/渔'
  },
  {
    id: 45,
    name: '跨领域经营'
  },
  {
    id: 46,
    name: '其它'
  }
]

module.exports = {
  bloodArray: bloodArray,
  objectBloodArray: objectBloodArray,
  cultureArray: cultureArray,
  objectCultureArray: objectCultureArray,
  marriageArray: marriageArray,
  objectMarriageArray: objectMarriageArray,
  industryArray: industryArray,
  objectIndustryArray: objectIndustryArray
}