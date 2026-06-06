import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Link, usePathname, useRouter } from 'expo-router';

export default function Sidenavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.drawerContent}>
      <Text style={styles.logo}>LadyBug</Text>

      <View style={styles.menuItems}>
        <Link href="/" asChild>
          <TouchableOpacity style={StyleSheet.flatten([styles.menuItem, pathname === '/' && styles.activeItem])}>
            <Text style={[styles.menuText, pathname === '/' && styles.activeText]}>🏠 Home</Text>
          </TouchableOpacity>
        </Link>
 
        <Link href="/about" asChild>
          <TouchableOpacity style={StyleSheet.flatten([styles.menuItem, pathname === '/about' && styles.activeItem])}>
            <Text style={[styles.menuText, pathname === '/about' && styles.activeText]}>ℹ️ About</Text>
          </TouchableOpacity>
        </Link>

        {/* Add more menu items here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#1f2327',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  menuItems: {
    gap: 10,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuText: {
    color: '#ccc',
    fontSize: 18,
  },
  activeItem: {
    backgroundColor: '#007AFF',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});