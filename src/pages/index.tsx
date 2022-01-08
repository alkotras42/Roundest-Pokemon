import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { trpc } from '../utils/trpc'
import styles from '../styles/Home.module.css'
import { getOptionsForVote } from 'src/utils/getRandomPokemon'
import { useState } from 'react'

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote())

  const [first, second] = ids

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2"> </div>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-64 h-64 flex flex-col">
          <img src={firstPokemon.data?.sprites.front_default} className="w-full" />
          <div className='text-xl flex justify-center capitalize'>{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">vs</div>
        <div className="w-64 h-64 flex flex-col">
          <img src={secondPokemon.data?.sprites.front_default} className="w-full" />
          <div className='text-xl flex justify-center capitalize'>{secondPokemon.data?.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Home
