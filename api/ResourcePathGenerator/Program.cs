using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;

namespace ResourcePathGenerator
{
  class Program
  {
    List<string> path = new List<string>();
    static void parseJson(JObject myObj, List<string> path)
    {

      foreach (var prop in myObj.Properties())
      {
        if (prop.Value.Type == JTokenType.Object)
        {
          path.Add(prop.Name);
          parseJson((JObject)prop.Value, path);
          path.RemoveAt(path.Count - 1);
        }
        else
        {
          path.Add(prop.Name);
          prop.Value = string.Join(".", path);
          path.RemoveAt(path.Count - 1);

        }
      }

    }
    static void addToFile(JsonTextWriter writer,JObject myObj)
    {
      writer.WriteStartObject();
      foreach (var prop in myObj.Properties())
      {
        if (prop.Value.Type == JTokenType.Object)
        {
          writer.WritePropertyName(prop.Name);
          addToFile(writer, (JObject)prop.Value);
        }
        else
        {
          writer.WritePropertyName(prop.Name);
          writer.WriteValue(prop.Value);

        }
      }
      writer.WriteEnd();
    }
    static void Main(string[] args)
    {
      JObject o2;
      using (StreamReader file = new StreamReader("C:\\Users\\Flore\\workSpace\\practica\\practica\\recipes\\api\\ResourcePathGenerator\\file.json"))
      { 
        List<string> path = new List<string>();
        using (JsonTextReader reader = new JsonTextReader(file))
        {

          o2 = (JObject)JToken.ReadFrom(reader);
          Console.WriteLine(o2);
          parseJson(o2, path);
          Console.WriteLine(o2);
          Console.ReadLine();

        }
      }
      using (StreamWriter file2 = new StreamWriter("C:\\Users\\Flore\\workSpace\\practica\\practica\\recipes\\api\\ResourcePathGenerator\\fileConverted.json"))
      {
        using (JsonTextWriter writer = new JsonTextWriter(file2))
        {
          writer.Formatting = Formatting.Indented;
          addToFile(writer, o2);
        }
      }

    }
  }
}
