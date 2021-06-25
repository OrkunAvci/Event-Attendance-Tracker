package com.example.mid.Hash;

public class MessageBlock
{
    private int[] data;
    
    public MessageBlock(String str)
    {
        data = new int [16];
        for (int i = 0; i < str.length(); i++)
        {
            data[i / 4] += str.charAt(i);
            data[i / 4] = data[i / 4] << 8;
        }
    }
    
    public MessageBlock(String str, int l14, int l15)
    {
        data = new int [16];
        for (int i = 0; i < str.length(); i++)
        {
            data[i / 4] += str.charAt(i);
            data[i / 4] = data[i / 4] << 8;
        }
        data[14] = l14;
        data[15] = l15;
    }
    
    public int[] processBlock()
    {
        Operations op = new Operations();
        int[] words = new int[64];
        for (int i = 0; i < 16; i++)
        {
            words[i] = data[i];
        }
    
        for (int i = 16; i < 64; i++)
        {
            words[i] = op.add( op.add( op.sigma_1( words[i - 16] ), op.sigma_2( words[i - 2] ) ), op.add( op.sigma_3( words[i - 13] ), op.sigma_4( words[i - 7] ) ) );
        }
    
        return words;
    }
    
}
