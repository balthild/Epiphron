import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { PlatformPressable, SafeAreaProviderCompat } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';

import { IconName, Remix } from './components/Remix';
import { RemoveSuffix } from './helpers';
import { useResponsive } from './hooks';
import { TodoScreen } from './screens/TodoScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';

function tabIconLineFill(
  name: RemoveSuffix<IconName, '-line' | '-fill'>,
  large: boolean,
): BottomTabNavigationOptions['tabBarIcon'] {
  return ({ focused, color, size }) => {
    const fullName = (name + (focused ? '-fill' : '-line')) as IconName;
    return <Remix name={fullName} color={color} size={large ? 20 : size} />;
  };
}

const Tabs = createBottomTabNavigator();

function HomeTabs() {
  const r = useResponsive();

  return (
    <Tabs.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarPosition: r.sll('bottom', 'left'),
        tabBarActiveBackgroundColor: r.ssl('transparent', '#f2f2f4'),
        tabBarActiveTintColor: '#3d3d3f',
        tabBarInactiveTintColor: r.ssl('#909092', '#3d3d3f'),
        tabBarStyle: {
          height: r.sll(60, undefined),
          width: r.sml(undefined, 80, 240),
          minWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          paddingHorizontal: r.sll('5%', undefined),
        },
        tabBarItemStyle: {
          marginBottom: r.sml(undefined, 12, undefined),
        },
        tabBarIconStyle: {
          flex: r.ssl(1, undefined),
          marginLeft: r.ssl(0, 6),
        },
        tabBarShowLabel: r.ssl(false, true),
        tabBarLabelPosition: r.sll('below-icon', 'beside-icon'),
        tabBarLabelStyle: {
          fontSize: 16,
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity>
            <Remix name="search-line" size={24} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity>
            <Remix name="filter-line" size={24} />
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerLeftContainerStyle: {
          paddingLeft: r.ssl(16, 24),
        },
        headerRightContainerStyle: {
          paddingRight: r.ssl(16, 24),
        },
      }}>
      <Tabs.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: tabIconLineFill('file-list-3', r.isLarge),
        }}
      />
      <Tabs.Screen
        name="Insights"
        component={TodoScreen}
        options={{
          tabBarIcon: tabIconLineFill('bar-chart-box', r.isLarge),
        }}
      />

      {r.isSmall && (
        <Tabs.Screen
          name="meta__TabNewBtnMiddle"
          component={TodoScreen}
          options={{
            tabBarItemStyle: {
              marginHorizontal: 16,
            },
            tabBarButton: (props) => {
              let { style, ...rest } = props;
              return (
                <PlatformPressable
                  {...rest}
                  pressOpacity={0.5}
                  style={[
                    style,
                    {
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                />
              );
            },
            tabBarIcon: () => <Remix name="add-fill" size={24} color="white" />,
            tabBarIconStyle: {
              width: 60,
              height: 36,
              marginVertical: 6,
              borderRadius: 18,
              borderCurve: 'continuous',
              backgroundColor: '#3d3d3f',
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Transaction');
            },
          })}
        />
      )}

      <Tabs.Screen
        name="Metadata"
        component={TodoScreen}
        options={{
          tabBarIcon: tabIconLineFill('collage', r.isLarge),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={TodoScreen}
        options={{
          tabBarIcon: tabIconLineFill('settings', r.isLarge),
        }}
      />

      {!r.isSmall && (
        <Tabs.Screen
          name="meta__TabNewBtnBottom"
          component={TodoScreen}
          options={{
            tabBarItemStyle: {
              marginTop: r.ssl(8, 'auto'),
              marginBottom: 16,
            },
            tabBarButton: (props) => {
              let { style, ...rest } = props;
              return (
                <PlatformPressable
                  {...rest}
                  pressOpacity={0.5}
                  style={[
                    style,
                    {
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: r.ssl(40, 120),
                      height: r.ssl(40, undefined),
                      borderRadius: r.ssl(20, 3),
                      borderCurve: 'continuous',
                      backgroundColor: '#3d3d3f',
                    },
                  ]}
                />
              );
            },
            tabBarIcon: () => <Remix name="add-fill" size={24} color="white" />,
            tabBarIconStyle: {
              marginLeft: r.ssl(0, 4),
            },
            tabBarLabel: 'New',
            tabBarLabelStyle: {
              color: 'white',
              marginLeft: 4,
              marginRight: 12,
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Transaction');
            },
          })}
        />
      )}
    </Tabs.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  const r = useResponsive();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: r.ssl('card', 'transparentModal'),
          headerShown: !r.isLarge,
          contentStyle: r.isLarge && {
            backgroundColor: '#00000080',
            alignItems: 'center',
            paddingVertical: 48,
          },
        }}>
        <Stack.Screen name="Transaction" component={TodoScreen} />
        <Stack.Screen name="Category" component={TodoScreen} />
        <Stack.Screen name="Tag" component={TodoScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export function App() {
  return (
    <SafeAreaProviderCompat>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProviderCompat>
  );
}
