<script>
    //1,实现js 原型继承  B 继承 A
    function A () {

    }
    A.prototype.log = function () {

    }
    function B () {}

    //2,实现js 构造继承   B 继承 A
    function A () {

    }
    A.prototype.log = function () {

    }
    function B () {}

    //3,函数 fun 实现功能 "asdfg" 转化为 "sdf"
    function fun () {

    }

    //4,函数 upper 实现 "asd_ad_bsdas_csd_asd_dccds_sdc_" 转化为 _后面的字母大写 asd_Ad_Bsdas_Csd_Asd_Dccds_Sdc_
    function upper () {

    }

    //5,实现js 的 bind 方法
    //var f = fun.bind(this, a, b) 
    //f(c,d)
    Function.prototype.bind = function () {

    }

    //6,统计对象key
    /*
    var o = {
        a: {

        },
        b: {
            c: {
                e: {

                }
            }
        },
        d: {

        }
    }
    输出 [[a,b,d],[c],[e]]
    对象第一级key 放在统计结果的0位置数组，第二级放在1位置数组中，以此类推
    */
    
</script>