import type { ChangeEvent } from 'react'
import styled from 'styled-components/macro'

import indicatorHorizontal from '@/assets/indicator.svg'

const StyledRange = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 21px;
    width: 11px;
    background: url(${indicatorHorizontal});
    transform: translateY(-8px);
    box-shadow: none;
    border: none;
  }

  &::-moz-range-thumb {
    height: 21px;
    width: 11px;
    border: 0;
    border-radius: 0;
    background: url(${indicatorHorizontal});
    transform: translateY(2px);
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    box-sizing: border-box;
    background: black;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
    box-shadow: 1px 0 0 white, 1px 1px 0 white, 0 1px 0 white, -1px 0 0 darkgrey, -1px -1px 0 darkgrey,
      0 -1px 0 darkgrey, -1px 1px 0 white, 1px -1px darkgrey;
  }

  &::-moz-range-track {
    width: 100%;
    height: 2px;
    box-sizing: border-box;
    background: black;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
    box-shadow: 1px 0 0 white, 1px 1px 0 white, 0 1px 0 white, -1px 0 0 darkgrey, -1px -1px 0 darkgrey,
      0 -1px 0 darkgrey, -1px 1px 0 white, 1px -1px darkgrey;
  }
`

export default function ProgressBar({
  value,
  onChange,
}: {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return <StyledRange value={value} onChange={onChange} />
}
