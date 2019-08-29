import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/page/:pageSerial',
            name: 'PageView',
            component: () => import('@/views/page'),
            meta: {title: '', requireAuth: true}
        },
        {
            path: '/discover',
            name: 'Discover',
            component: () => import('@/views/discover'),
            meta: {title: '发现', requireAuth: true}
        },
        {
            path: '/download',
            name: 'Download',
            component: () => import('@/views/download'),
            meta: {title: '下载优途', requireAuth: true}
        },
        {
            path: '/system',
            component: () => import('@/views/BaseLayout'),
            children: [
                {
                    path: 'service',
                    component: () => import('@/views/BaseLayout'),
                    children: [
                        {
                            path: 'index',
                            name: 'ServiceIndex',
                            component: () => import('@/views/system/service'),
                            meta: {title: '客服中心', requireAuth: true},
                        }
                    ]
                }
            ]
        },
        {
            path: '/member',
            component: () => import('@/views/BaseLayout'),
            children: [
                {
                    path: 'fuelcard',
                    name: 'FuelCard',
                    component: () => import('@/views/member/fuelcard'),
                    meta: {title: '我的加油卡', requireAuth: true}
                },
                {
                    path: 'favorite',
                    name: 'MemberFavorite',
                    component: () => import('@/views/member/favorite'),
                    meta: {title: '我的收藏', requireAuth: true}
                },
                {
                    path: 'message',
                    component: () => import('@/views/BaseLayout'),
                    children: [
                        {
                            path: 'index',
                            name: 'MessageIndex',
                            component: () => import('@/views/member/message/index'),
                            meta: {title: '消息中心', requireAuth: true}
                        },
                    ]
                },
                {
                    path: 'integral',
                    component: () => import('@/views/BaseLayout'),
                    children: [
                        {
                            path: 'index',
                            name: 'IntegralIndex',
                            component: () => import('@/views/member/integral/index'),
                            meta: {title: '消息中心', requireAuth: true}
                        },
                    ]
                },
                {
                    path: 'coupon',
                    component: () => import('@/views/BaseLayout'),
                    children: [
                        {
                            path: 'index',
                            name: 'CouponIndex',
                            component: () => import('@/views/member/coupon/index'),
                            meta: {title: '我的卡券', requireAuth: true}
                        },
                    ]
                },
                {
                    path: 'address',
                    name: 'MemberAddress',
                    component: () => import('@/views/BaseLayout'),
                    children: [
                        {
                            path: 'index',
                            name: 'AddressIndex',
                            component: () => import('@/views/member/address/index'),
                            meta: {title: '我的地址', requireAuth: true}
                        },
                        {
                            path: 'create',
                            name: 'AddressCreate',
                            component: () => import('@/views/member/address/edit'),
                            meta: {title: '添加地址', requireAuth: true}
                        },
                        {
                            path: 'update/:id',
                            name: 'AddressUpdate',
                            component: () => import('@/views/member/address/edit'),
                            meta: {title: '地址编辑', requireAuth: true}
                        }
                    ]
                },
                {
                    path: 'bill',
                    name: 'Bill',
                    component: () => import('@/views/member/bill/layout'),
                    meta: {requireAuth: false},
                    children: [
                        {
                            path: 'index',
                            name: 'BillIndex',
                            component: () => import('@/views/member/bill/index'),
                            meta: {title: '我的账单', requireAuth: true}
                        },
                        {
                            path: 'stat',
                            name: 'BillStatistics',
                            component: () => import('@/views/member/bill/statistics'),
                            meta: {title: '消費统计', requireAuth: true}
                        },
                        {
                            path: 'detail/:type/:id',
                            name: 'BillDetail',
                            component: () => import('@/views/member/bill/detail'),
                            meta: {title: '账单详情', requireAuth: true}
                        }
                    ]
                },
                {
                    path: 'order',
                    name: 'Order',
                    component: () => import('@/views/BaseLayout'),
                    meta: {requireAuth: false},
                    children: [
                        {
                            path: 'index',
                            name: 'OrderIndex',
                            component: () => import('@/views/member/order/index'),
                            meta: {title: '我的订单', requireAuth: true}
                        },
                        {
                            path: 'detail/:id',
                            name: 'OrderDetail',
                            component: () => import('@/views/member/order/detail'),
                            meta: {title: '订单详情', requireAuth: true}
                        },
                        {
                            path: 'refunddetail/:id',
                            name: 'RefundDetail',
                            component: () => import('@/views/member/order/refunddetail'),
                            meta: {title: '退款详情', requireAuth: true}
                        }, {
                            path: 'standdetail/:id',
                            name: 'StandDetail',
                            component: () => import('@/views/member/order/standdetail'),
                            meta: {title: '待使用订单', requireAuth: true}
                        },{
                            path: 'refund/:id',
                            name: 'Refund',
                            component: () => import('@/views/member/order/refund'),
                            meta: {title: '申请退款', requireAuth: true}                            
                        }
                    ]
                },
                {
                    path: 'staffer',
                    name: 'Staffer',
                    component: () => import('@/views/BaseLayout'),
                    meta: {requireAuth: false},
                    children: [
                        {
                            path: 'index',
                            name: 'StafferIdent',
                            component: () => import('@/views/member/staffer/ident'),
                            meta: {title: '员工认证', requireAuth: true}
                        }
                    ]
                },
                {
                    path: 'car',
                    name: 'Car',
                    component: () => import('@/views/BaseLayout'),
                    meta: {requireAuth: false},
                    children: [
                        {
                            path: 'index',
                            name: 'CarIndex',
                            component: () => import('@/views/member/car/index'),
                            meta: {title: '车辆管理', requireAuth: true}
                        },
                        {
                            path: 'brand',
                            name: 'CarBrand',
                            component: () => import('@/views/member/car/brand'),
                            meta: {title: '车辆品牌', requireAuth: true}
                        },
                        {
                            path: 'series',
                            name: 'CarSeries',
                            component: () => import('@/views/member/car/series'),
                            meta: {title: '车辆型号', requireAuth: true}
                        },
                        {
                            path: 'license',
                            name: 'CarLicense',
                            component: () => import('@/views/member/car/license'),
                            meta: {title: '车牌号', requireAuth: true}
                        },
                        {
                            path: 'detail/:id/:isAuthentication',
                            name: 'CarDetail',
                            component: () => import('@/views/member/car/detail'),
                            meta: {title: '车辆信息', requireAuth: true}
                        },
                        {
                            path: 'edit/:id',
                            name: 'CarEdit',
                            component: () => import('@/views/member/car/edit'),
                            meta: {title: '车辆信息编辑', requireAuth: true}
                        }
                    ]
                },
                {
                    path: 'promote',
                    name: 'Promote',
                    component: () => import('@/views/BaseLayout'),
                    meta: {requireAuth: false},
                    children: [
                        {
                            path: 'index',
                            name: 'PromoteIndex',
                            component: () => import('@/views/member/promote/index'),
                            meta: {title: '员工推广', requireAuth: true}
                        },
                        {
                            path: 'invite',
                            name: 'PromoteInvite',
                            component: () => import('@/views/member/promote/invite'),
                            meta: {title: '推广人数', requireAuth: true}
                        },
                        {
                            path: 'qrcode',
                            name: 'PromoteQrcode',
                            component: () => import('@/views/member/promote/qrcode'),
                            meta: {title: '我的推广码', requireAuth: true}
                        },
                        {
                            path: 'editstuff',
                            name: 'Editstuff',
                            component: () => import('@/views/member/promote/editstuff'),
                            meta: {title: '修改员工信息', requireAuth: true}
                        },
                    ]
                },
                {
                    path: 'vip',
                    name: 'Vip',
                    component: () => import('@/views/member/vip'),
                    meta: {title: '优途会员', requireAuth: true}
                }
            ]
        },
        {
            path: '/mall',
            name: 'Mall',
            component: () => import('@/views/BaseLayout'),
            meta: {requireAuth: false},
            children: [
                {
                    path: 'store',
                    name: 'Store',
                    component: () => import('@/views/BaseLayout'),
                    children: [
                        {
                            path: 'street',
                            name: 'StoreStreet',
                            component: () => import('@/views/mall/store/street'),
                            meta: {title: '逛好店', requireAuth: true}
                        }
                    ]
                }
            ]
        },
        {
            path: '/promotion',
            name: 'Promotion',
            component: () => import('@/views/BaseLayout'),
            meta: {requireAuth: false},
            children: [
                {
                    path: 'ssc',
                    name: 'SSC',
                    component: () => import('@/views/BaseLayout'),
                    children: [
                        {
                            path: 'index',
                            name: 'SscIndex',
                            component: () => import('@/views/promotion/ssc/index'),
                            meta: {title: '扫码赠券', requireAuth: true}
                        },
                        {
                            path: 'coupon',
                            name: 'SscCoupon',
                            component: () => import('@/views/promotion/ssc/coupon'),
                            meta: {title: '扫码赠券', requireAuth: true}
                        }
                    ]
                },
                {
                    path: 'newuser',
                    component: () => import('@/views/promotion/newuser'),
                    meta: {title: '注册有礼', requireAuth: true}
                },
                {
                    path: 'newuser/:erpcode',
                    component: () => import('@/views/promotion/newuser'),
                    meta: {title: '注册有礼', requireAuth: true}
                }
            ]
        },
        {
            path: '/industry',
            component: () => import('@/views/BaseLayout'),
            children: [
                {
                    path: 'index',
                    component: () => import('@/views/industry/business/commodity'),
                },
                {
                    path: 'details',
                    component: () => import('@/views/industry/business/details'),
                },
                {
                    path: 'goodsDetails',
                    component: () => import('@/views/industry/business/goodsDetails'),
                },
                {
                    path: 'industryOrder/:cartKey',
                    component: () => import('@/views/industry/business/order'),
                },
                {
                    path: 'coupons',
                    component: () => import('@/views/industry/business/coupons'),
                }

                // {
                //     path: '/details',
                //     name: 'details',
                //     component: () => import('@/views/industry/business/details'),
                //     // meta: { title: '员工认证', requireAuth: true }
                // }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) document.title = to.meta.title;
    next();
});
export default router;