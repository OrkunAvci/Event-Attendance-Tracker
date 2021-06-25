package com.example.mid.Hash;

import java.util.ArrayList;
import java.util.List;

public class Hash
{
    private int[] primes = new int[64];
    private int[] output = new int[8];
    private List<MessageBlock> blocks = new ArrayList<>();
    
    public Hash(String input)
    {
        int [] myprimes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
                            31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
                            73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
                            127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
                            179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
                            233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
                            283, 293, 307, 311};		//	64 in total.
    
        double helper;
        double dump;
        for (int i = 0; i < 64; i++)
        {
            helper = (double)myprimes[i];
            helper = Math.cbrt(helper);
            helper = helper % 1.0;
            helper = helper * 1000000000;	//	helper * pow(10,9)
            primes[i] = (int) helper;
        }
    
        for (int i = 0; i < 8; i++)
        {
            helper = (double)myprimes[i];
            helper = Math.sqrt(helper);
            helper = helper % 1.0;
            helper = helper * 1000000000;	//	helper * pow(10,9)
            output[i] = (int) helper;
        }
    
        String sub_str = "";
        for (int i = 0; i < input.length() / 64; i++)
        {
            sub_str = input.substring(i * 64, (i + 1) * 64);
            blocks.add( new MessageBlock(sub_str) );
        }
        sub_str = input.substring( (input.length() / 64) * 64, input.length() );
        blocks.add( new MessageBlock(sub_str, (int) input.length() / Integer.MAX_VALUE, (int) input.length() % Integer.MAX_VALUE) );
    
        //	Hash every block:
        for (MessageBlock m : blocks)
        {
            conmpression(output, m.processBlock(), primes);
        }
        
        blocks.clear();
    }
    
    private void conmpression(int[] output, int[] word_schedule, int[] constants)
    {
        Operations op = new Operations();
        
        //	Save the current state:
        int[] prev_state = new int[8];
        for (int i = 0; i < 8; i++)	{	prev_state[i] = output[i];	}
    
        int intermediate1, intermediate2;
        for (int i = 0; i < 64; i++)
        {
            //	intermediate1:
            intermediate1 = op.add( op.sigma_1( output[4] ), op.cho( output[4], output[5], output[6] ) );
            intermediate1 += op.add( word_schedule[i], constants[i] );
        
            //	intermediate2:
            intermediate2 = op.add( op.sigma_2( output[0] ), op.maj( output[0], output[1], output[2] ) );
        
            //	Shift the output array:
            for (int j = 7; j > 0; j--)	{	output[j - 1] = output[j];		}
        
            //	Insert intermediates:
            output[0] = op.add(intermediate1, intermediate2);
            output[4] = op.add(output[4], intermediate1);
        }
    
        //	Add the previous state's values to the output:
        for (int i = 0; i < 8; i++)	{	output[i] = op.add( output[i], prev_state[i] );	}
    
    }

    public String  getOutput0(){
        String outputStr = "";
        for(int i = 0; i<8 ; i++){
            outputStr += Integer.toHexString(output[i]);
        }
        return outputStr;
    }



    public int[] getOutput() {
        return output;
    }

    public void setOutput(int[] output) {
        this.output = output;
    }

    public int[] getPrimes() {
        return primes;
    }

    public void setPrimes(int[] primes) {
        this.primes = primes;
    }

    public List<MessageBlock> getBlocks() {
        return blocks;
    }

    public void setBlocks(List<MessageBlock> blocks) {
        this.blocks = blocks;
    }
}