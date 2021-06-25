package com.example.mid.Hash;

public class Operations
{
    
    public Operations() {}
    
    //  Bit manipulators:
    public int shr(int var, int count)
    {
        return (var >> count);
    }
    
    public int shl(int var, int count)
    {
        return (var << count);
    }
    
    public int rtr(int var, int count)
    {
        int control = 1;
        int addon = 1 << 31;
        for (int i = 0;
             i<count ;
             i++, control = 1)
        {
            control = control & var;
            var = var >> 1;
            var += (control != 0) ? addon : 0;
        }
        return var;
    }
    
    public int rtl(int var, int count)
    {
        int control = 1 << 31;
        int addon = 1;
        for (int i = 0; i<count; i++, control = 1 << 31)
        {
            control = control & var;
            var = var << 1;
            var += (control != 0) ? addon : 0;
        }
        return var;
    }
    
    public int add(int var1, int var2)    //	Full name is controlled_add(), a work around for overflow issues.
    {
        int excess = (var1 & 1) + (var2 & 1);
        return excess + shl(shr(var1, 1) + shr(var2, 1), 1);
    }
    
    public int maj(int var1, int var2, int var3)
    {
        //	Majority bit value among three, for each bit.
        return (var1 & var2) | (var1 & var3) | (var2 & var3);
    }
    
    public int cho(int var1, int var2, int var3)
    {
        int output = 0;
        for (int filter = 1; filter != 0; filter = shl(filter, 1))
        {
            //	To determine which variable's bit will be chosen to copy over, use var1's bit.
            if ((filter & var1) != 0)
            {
                output = output ^ (filter & var3);
            } else
            {
                output = output ^ (filter & var2);
            }
        }
        return output;
    }
    
    //  Sigma functions:
    public int sigma_1(int var)
    {
        final int rtr_c = 13;
        final int rtl_c = 19;
        final int shr_c = 7;
        return rtr(var, rtr_c) ^ rtl(var, rtl_c) ^ shr(var, shr_c);
    }
    
    public int sigma_2(int var)
    {
        final int rtr_c = 17;
        final int rtl_c = 3;
        final int shl_c = 11;
        return rtr(var, rtr_c) ^ rtl(var, rtl_c) ^ shl(var, shl_c);
    }
    
    public int sigma_3(int var)
    {
        final int rtr1_c = 11;
        final int rtl_c = 29;
        final int rtr2_c = 13;
        return rtr(var, rtr1_c) ^ rtl(var, rtl_c) ^ rtr(var, rtr2_c);
    }
    
    public int sigma_4(int var)
    {
        final int rtr1_c = 5;
        final int rtl_c = 17;
        final int rtl2_c = 23;
        return rtr(var, rtr1_c) ^ rtl(var, rtl_c) ^ rtr(var, rtl2_c);
    }
}
