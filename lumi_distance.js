function lumi_dis(H_0,z,OMEGA_M,OMEGA_L){
    var C = 2.99792458e+5,  
    a = 0, 
    h, 
    err = 1,
    epsilon = 1.0e-7,
    trapezoid, midpoint, simpson,
    new_simpson,
    lumi_distance;
    h = z - a;  
    trapezoid = h * (f(a) + f(z)) / 2;

    if(z < 0 || 1000 < z){
        alert("0<z<1000までの値を入力してください");
    }  

    function f(z){
        return C / H_0 /Math.sqrt(OMEGA_M * Math.pow((1+z),3) + OMEGA_L );
    }

    for (n = 1; err > epsilon ; n *= 2){
        midpoint = 0;
        for (i = 1; i <= n; i++){
            midpoint += f(a + h * (i - 0.5));
        }
        midpoint *= h;
        new_simpson = (trapezoid + 2 * midpoint) / 3;
        err         = Math.abs(new_simpson - simpson) / Math.abs(new_simpson);
        simpson     = new_simpson;
        h /= 2;  
        trapezoid = (trapezoid + midpoint) / 2;
    }
    lumi_distance = (1+z) * simpson;
    return lumi_distance;
}



