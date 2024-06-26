import { useState } from 'react'
import styled from 'styled-components/macro'

import ItemsList from '@/pages/Auction/CollectionsList/ItemsList'
import Pagination from '@/pages/Auction/CollectionsList/Pagination'

const CollectionsListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.5rem;
  }
`

const HeadersWrapper = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  @media only screen and (max-width: 640px) {
    display: none;
  }
`
const Header = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: 900;
`

const ItemsListWrapper = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 640px) {
    overflow-y: auto;
  }
`

const Headers = [
  { title: 'Name', width: '35%' },
  { title: 'Description', width: '40%' },
  { title: 'Website', width: '25%' },
  // { title: 'Supply', width: '15%' },
]

const ITEM_PER_PAGE = 4

export default function CollectionsList({
  nfts,
  setPageSection,
}: {
  nfts: string[]
  setPageSection: (section: string) => void
}) {
  const totalPages = Math.ceil(nfts.length / ITEM_PER_PAGE)
  const [currentCounter, setCurrentCounter] = useState<number>(1)

  return (
    <CollectionsListWrapper>
      <HeadersWrapper>
        {Headers.map(({ title, width }, index: number) => (
          <Header key={index} style={{ width }}>
            {title}
          </Header>
        ))}
      </HeadersWrapper>
      <ItemsListWrapper>
        {nfts.slice(ITEM_PER_PAGE * (currentCounter - 1), ITEM_PER_PAGE * currentCounter).map((nft, index: number) => (
          <ItemsList key={index} nft={nft} setPageSection={setPageSection} />
        ))}
      </ItemsListWrapper>
      <Pagination totalPages={totalPages} currentPage={currentCounter} setCurrentCounter={setCurrentCounter} />
    </CollectionsListWrapper>
  )
}
