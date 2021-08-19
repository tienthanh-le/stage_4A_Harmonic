#include <napi.h>

class ObjectWrapDemo : public Napi::ObjectWrap<ObjectWrapDemo>
{
public:
    ObjectWrapDemo(const Napi::CallbackInfo &);
    Napi::Value CallString(const Napi::CallbackInfo &info);
    Napi::Value GetLength(const Napi::CallbackInfo &info);

    static Napi::Function GetClass(Napi::Env);

private:
    std::string _data;
};
