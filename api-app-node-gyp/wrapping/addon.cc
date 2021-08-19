#include <node.h>

#include "finding.h"

// #include <algorithm> // for std::find
// #include <iterator>  // for std::begin, std::end;

namespace demo
{

    using v8::Exception;
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::String;
    using v8::Value;

    void Compare(const FunctionCallbackInfo<Value> &args)
    {
        // 2 args input, verify if they're the same value
        Isolate *isolate = args.GetIsolate();

        // Add check number of arguments passed (2) and Check argument types (int)
        // Check the number of arguments passed.
        if (args.Length() < 2)
        {
            // Throw an Error that is passed back to JavaScript
            isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate,
                                    "Must be 2 arguments entered")
                    .ToLocalChecked()));
            return;
        }

        // Check the argument types
        if (!args[0]->IsNumber() || !args[1]->IsNumber())
        {
            isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate,
                                    "Argument type musts be number")
                    .ToLocalChecked()));
            return;
        }

        //Perform the operation
        bool compare = args[0].As<Number>()->Value() == args[1].As<Number>()->Value();

        // Set the return value
        args.GetReturnValue()
            .Set(compare);
    };

    void Initialize(Local<Object> exports)
    {
        NODE_SET_METHOD(exports, "compare", Compare);
        MyObject::Init(exports);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

} // namespace demo

// void Existed(const FunctionCallbackInfo<Value> &args)
// {
//     Isolate *isolate = args.GetIsolate();

//     unsigned int test_string[] = {1, 2, 3};
//     unsigned int result_id;

//     double array[] = args[1].As<Number>()->Value();

//     for (unsigned int i = 0; i < sizeof(array) / sizeof(*array); i += 1)
//     {
//         if (args[0].As<Number>()->Value() == array[i])
//         {
//             result_id = array[i];
//         }
//     }
//     // Set the return value
//     args.GetReturnValue()
//         .Set(result_id);
// };