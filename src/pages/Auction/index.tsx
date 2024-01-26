import WarningIcon from 'assets/icon/warning.png'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import type { Address } from 'viem'
import { mainnet, useNetwork } from 'wagmi'

import ErrorWindow from '@/components/ErrorWindow'
import ExplorerWrapper from '@/components/ExplorerWrapper'
import ProductDetail from '@/components/ProductDetail'
import { Button } from '@/components/ProductDetail/ImagesList'
import ProductList from '@/components/ProductList'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import { MIYATEES_AUCTION_CONTRACT } from '@/constants/contracts'
import Pages from '@/constants/pages'
import { useAccount } from '@/context/AccountProvider'
import { useAuctionsList } from '@/pages/Auction/useAuctionsList'
import { updateAuctionsList } from '@/store/auction/actions'
import type { Auction, Product } from '@/store/auction/reducer'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import type { PageKey } from '@/store/windows/reducer'
import { getAuctionsListDetail } from '@/utils/getAuctionsListDetail'

const page = Pages.auction
const pageId = page?.id as PageKey

const ErrorWrapper = styled.div`
  width: 50%;
  height: 26%;
  position: absolute;
  top: 37%;
  left: 25%;
`

const ErrorContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ErrorMessage = styled.div`
  height: calc(200% / 3);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;

  > img {
    width: 3rem;
    height: 3rem;
    border: none;
    margin: 0;
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    overflow: scroll;
  }

  > * + * {
    margin-left: 1rem;
  }
`

const ErrorButton = styled.div`
  height: calc(100% / 3);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function AuctionPage() {
  // Window mgmt
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const { balance } = useAccount()

  const [errorMessage, setErrorMessage] = useState('')
  const [errorName, setErrorName] = useState('MiyaAuction Error')
  const [data, setData] = useState<Auction[]>([])

  // Network
  const { chain } = useNetwork()
  const miyaTeesAuction = MIYATEES_AUCTION_CONTRACT[chain?.id || mainnet.id] || MIYATEES_AUCTION_CONTRACT[mainnet.id]!

  // Get contract data
  const { auctionsList } = useAuctionsList({
    address: miyaTeesAuction as Address,
    chainId: chain?.id,
  })

  const handleCloseErrorPopup = () => {
    setErrorName('MiyaAuction Error')
    setErrorMessage('')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetAuctionsListDetail = async () => {
    const result = await getAuctionsListDetail(auctionsList)
    dispatch(updateAuctionsList({ auctions: result as Product[] }))
  }

  useEffect(() => {
    if (auctionsList.length && auctionsList.length !== data.length) {
      setData(auctionsList)
    }
  }, [auctionsList, data.length])

  useEffect(() => {
    handleGetAuctionsListDetail()
  }, [data, handleGetAuctionsListDetail])

  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          close()
        }}
        minimizeBtn
        onMinimize={(e) => {
          if (e.cancelable) e.stopPropagation()
          minimize()
        }}
      >
        {page?.label}
      </TitleBar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          gap: '1rem',
          height: 'calc(100% - 1.5rem)',
        }}
      >
        <ExplorerWrapper style={{ height: '60%' }} title={'Active item'}>
          <ProductDetail
            balance={balance}
            setErrorMessage={setErrorMessage}
            setErrorName={setErrorName}
            chain={chain}
            auctionContract={miyaTeesAuction}
          />
        </ExplorerWrapper>
        <ExplorerWrapper style={{ height: '40%' }} title={'Active lots'}>
          <ProductList />
        </ExplorerWrapper>
        {errorMessage && (
          <ErrorWrapper>
            <ErrorWindow errorLabel={errorName} handleClose={handleCloseErrorPopup}>
              <ErrorContent>
                <ErrorMessage>
                  <img src={WarningIcon} alt="Error icon" />
                  <div>{errorMessage}</div>
                </ErrorMessage>
                <ErrorButton>
                  <Button style={{ width: '30%' }} onClick={handleCloseErrorPopup}>
                    OK
                  </Button>
                </ErrorButton>
              </ErrorContent>
            </ErrorWindow>
          </ErrorWrapper>
        )}
      </div>
    </WindowWrapper>
  )
}
