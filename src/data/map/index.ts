import henan from './henan.json'
import qinghai from './qinghai.json'
import shannxi from './shannxi.json'
import shanxi from './shanxi.json'

const maplist = [
  {
    id: 1,
    name: '山西',
    data: shanxi,
    arrive: ['运城', '晋中', '太原', '临汾'],
  },
  {
    id: 2,
    name: '青海',
    data: qinghai,
    arrive: ['西宁', '海南', '海北'],
  },
  {
    id: 3,
    name: '河南',
    data: henan,
    arrive: ['洛阳', '三门峡'],
  },
  {
    id: 4,
    name: '陕西',
    data: shannxi,
    arrive: ['西安', '渭南'],

  },
]

export default maplist
