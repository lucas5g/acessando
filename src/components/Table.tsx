import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { useAppContext } from "@/providers/AppProvider";
import { useSearchParams } from "react-router";
import { useEffect, useRef } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { SpeedAudio } from "@/components/SpeedAudio";
import { clsx } from 'clsx';

export function Table() {

  const { uri, search, setSearch, fieldsTable, fieldsFilter } = useAppContext()
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);



  const { data, isLoading, isFetched, error } = useQuery({
    queryKey: [uri, search],
    queryFn: () => fetch(search).then(res => res.json()),
    placeholderData: keepPreviousData
  })

  useEffect(() => {

    const data = Object.keys(fieldsFilter).reduce((acc: Record<string, string>, key) => {

      if (searchParams.has(key)) {
        acc[key] = searchParams.get(key) ?? ''
      }
      return acc
    }, {})

    if (Object.keys(data).length === 0) {
      formRef.current?.reset()
      setSearch(uri)
      return
    }

    const params = new URLSearchParams(data)


    setSearch(`/${uri}?${params}`)

  }, [searchParams])

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>
  return (

    <Card>
      <h2>List</h2>
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault()

          const formData = new FormData(event.currentTarget)

          const data: Record<string, string> = {};
          for (const [key, value] of formData.entries()) {
            if (value && typeof value === 'string') {
              data[key] = value
            }
          }

          setSearchParams(data);

          const params = new URLSearchParams(data).toString()

          setSearch(`/${uri}?${params}`)

        }}
        className="flex flex-col gap-2"
      >

        <div className={clsx('grid gap-3 grid-cols-2', {
          'grid-cols-3': Object.keys(fieldsFilter).length >= 3,
        })}>

          {Object.entries(fieldsFilter).map(([key, value]) => (
            <Input
              key={key}
              name={key}
              placeholder={value}
              required={false}
              defaultValue={searchParams.get(key) ?? ''}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={!isFetched}
        >
          Search
        </Button>
      </form>

      {data?.length === 0 &&
        <h2 className="text-2xl text-center my-10">Nada encontrado :(</h2>
      }

      {data.length > 0 &&

        <table className="w-full">
          <thead>
            <tr className="text-left ">
              {Object.values(fieldsTable).map((value) => (
                <th key={value}>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: any) => {

              return (
                <tr
                  key={row.id}
                  className="border-b last:border-0 hover:bg-gray-800 transition "
                >
                  {Object.keys(fieldsTable).map((key, index) => {

                    if (key === 'audio') {
                      return (
                        <td key={key} className="py-1">
                          <AudioPlayer phraseId={row.id} />
                        </td>
                      )
                    }

                    if (key === 'englishPortuguese') {
                      return (
                        <td key={key} className="py-1">
                          <p dangerouslySetInnerHTML={{ __html: row[key] }} />
                        </td>
                      )
                    }

                    return (

                      <td
                        key={key}
                        className={`py-4 ${index === 0 && 'pl-1'} `}
                      >
                        {row[key]}
                      </td>
                    )
                  })}

                </tr>
              )
            })}

          </tbody>
        </table>
      }


      {uri === 'phrases' &&
        <SpeedAudio />
      }
    </Card >
  )
}