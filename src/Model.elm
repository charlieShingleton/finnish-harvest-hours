module Model exposing (..)

import Material
import Date exposing (Date, Month)
import Http

{- kiky UI elements have been removed as unnecessary but cruft remains in 
   at least model and styles
-}
type alias Model =
    { httpError : Result Http.Error ()
    , loading : Bool
    , today : Date
    , currentDate : Date
    , entries : List DateEntries
    , totalHours : Maybe Float
    , kikyHours : Maybe Float
    , hourBalanceOfCurrentMonth : Maybe Float
    , user : User
    , holidays : List Holiday
    , specialTasks : SpecialTasks
    , previousBalanceString : String
    , previousBalance : Float
    , mdl : Material.Model
    }


type alias User =
    { firstName : String
    , lastName : String
    , previousBalance : Float
    , variantPeriods: List VariantPeriod
    }


type alias DateEntries =
    { date : Date
    , entries : List Entry
    }


type alias Entry =
    { hours : Float
    , taskId : Int
    }


type alias Holiday =
    { date : Date
    , name : String
    }


type alias HarvestTask =
    { id : Int }


type alias SpecialTasks =
    { ignore : List HarvestTask
    , kiky : List HarvestTask
    }


type alias Hours a =
    { a
        | normalHours : Float
        , kikyHours : Float
    }


type alias DateHours =
    Hours { date : Date }

type alias VariantPeriod =
    { start: Date
    , end: Maybe Date
    , dailyHours: Float
    }