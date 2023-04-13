// swapExactETHForTokens
import { ChainId, Token, Fetcher, Pair, TokenAmount, Route, Trade, TradeType, Percent } from '@uniswap/sdk'
import { ethers } from 'ethers'
import 'dotenv/config'

const rpcurl = process.env.GOERLI_RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(rpcurl);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY);
const account = signer.connect(provider);

const WETH = new Token(ChainId.RINKEBY, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18);
const LINK = new Token(ChainId.RINKEBY, '0x01BE23585060835E02B77ef475b0Cc51aA1e0709', 18);

const uniV2ABI = ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, \
									address to, uint deadline) external payable returns (uint[] memory amounts)'];
const uniswapContract = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', uniV2ABI, account);
const run = async () => {
  const pair = await Fetcher.fetchPairData(LINK, WETH, provider);

  // input: WETH
  const route = new Route([pair], WETH);
  
  // 1 WETH = ??? LINK
	// toSignificant(6) 保留6位有效数字
    console.log(route.midPrice.numerator.toString());
    console.log(route.midPrice.denominator.toString());
    console.log('WETH-LINK', route.midPrice.toSignificant(6));
  
    // 1 LINK = ??? WETH
    console.log(route.midPrice.invert().numerator.toString());
    console.log(route.midPrice.invert().denominator.toString());
    console.log('LINK-WETH', route.midPrice.invert().toSignificant(6));
  
    const trade = new Trade(route, new TokenAmount(WETH, ethers.utils.parseEther('0.003')), TradeType.EXACT_INPUT);
    console.log(trade.executionPrice.toSignificant(6));
  
    const slippageTolerance = new Percent('50', '10000');
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    // console.log(amountOutMin.toString())
    const path = [WETH.address, LINK.address];
    const to = '0x...' // PRIVATE_KEY's Address, 或者随便一个地址用来接收
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    const value = trade.inputAmount.raw;
    console.log(value.toString())
  
    const tx = await uniswapContract.swapExactETHForTokens(amountOutMin.toString(), path, to, deadline, {
      value: value.toString(),
      // maxFeePerGas: ethers.utils.parseUnits('2','gwei'),
      // maxPriorityFeePerGas: ethers.utils.parseUnits('2','gwei'),
    });
  
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(receipt);
   
  }
  
  run();  